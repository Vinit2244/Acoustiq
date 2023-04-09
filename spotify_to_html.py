from rich import print, prompt
import json
import requests
import os
from slugify import slugify
import shutil
from jinja2 import Environment, FileSystemLoader

TEMPLATE_ROOT = './src/templates/'
env = Environment(loader=FileSystemLoader(TEMPLATE_ROOT))

def insert_into_html_template (template_file, html_file, **kwargs):
    template = env.get_template(template_file)
    content = template.render(kwargs)
    with open(html_file, 'w') as file:
        file.write(content)        

# Insert your bearer token here
# TODO: Mechanism to create bearer tokens on the fly
BEARER_TOKEN = ''

IMG_ROOT = './src/media/'
IMG_REL_ROOT = './media/'
HTML_ROOT = './src/'
HTML_REL_ROOT = './'

# https://stackoverflow.com/a/18043472
def download_img (url, filepath):
    image = requests.get(url, stream=True)
    image.raw.decode_content = True
    with open(filepath, 'wb') as outfile:
        shutil.copyfileobj(image.raw, outfile)
    del image

def htmlize_songs_page (album, songs_list):
    album_file_name = slugify(album["name"])
    album['slug'] = album_file_name
    album_cover_art_path = IMG_ROOT + f'albums/{album_file_name}.jpeg'
    album_html_file_path = f'./src/albums/{album_file_name}.html'
    album_cover_art_url = album['images'][0]['url']
    album['img_path'] = IMG_REL_ROOT + f'albums/{album_file_name}.jpeg'
    album['html_path'] = HTML_REL_ROOT + f'albums/{album_file_name}.html'
    
    download_img(album_cover_art_url, album_cover_art_path)
    print("Album Cover Art Downloaded :white_check_mark:")

    template_path = 'songs.html.jinja'
    songs_list_filtered = []

    album_filtered = {
        'name': album['name'],
        'img_path': album['img_path'],
        'artist': album['artists'][0]['name'],
        'url': album['external_urls']['spotify']
    }
    
    # filtering out song metadata
    for song in songs_list:
        song_duration_seconds = song['duration_ms'] // 1000
        song_duration_minutes = song_duration_seconds // 60
        song_duration_seconds -= song_duration_minutes * 60
        song_filtered = {
            'name': song['name'],
            'url': song['external_urls']['spotify'],
            'duration_min': f'{song_duration_minutes}',
            'duration_sec': f'{song_duration_seconds:0>2}',
            'disc_num': song['disc_number'],
            'track_num': song['track_number']
        }
        songs_list_filtered.append(song_filtered)
        
    insert_into_html_template(template_path, album_html_file_path, songs_list=songs_list_filtered, album=album_filtered)
    print()
    return album
        
def htmlize_albums_page (artist, albums_list):
    artist_file_name = slugify(artist['name'])
    artist['slug'] = artist_file_name
    artist_img_path = IMG_ROOT + f'artists/{artist_file_name}.jpeg'
    artist_html_file_path = f'./src/artists/{artist_file_name}.html'
    artist_img_url = artist['images'][0]['url']
    artist['img_path'] = IMG_REL_ROOT + f'artists/{artist_file_name}.jpeg'
    artist['html_path'] = HTML_REL_ROOT + f'artists/{artist_file_name}.html'
    artist['num_albums'] = len(albums_list)

    download_img(artist_img_url, artist_img_path)
    print("Artist Cover Image Downloaded :white_check_mark:")

    template_path = 'albums.html.jinja'

    artist_filtered = {
        'name': artist['name'],
        'img_path': artist['img_path'],
        'no_albums': artist['num_albums']
    }

    albums_list_filtered = []
    for album in albums_list:
        album_filtered = {
            'name': album['name'],
            'url': album['external_urls']['spotify'],
            'html_path': album['html_path'],
            'img_path': album['img_path'],
            'num_tracks': album['total_tracks']
        }
        albums_list_filtered.append(album_filtered)

    albums_list_filtered = [albums_list_filtered[i: i + 2] for i in range(0, len(albums_list_filtered), 2)]
    insert_into_html_template(template_path, artist_html_file_path, albums_list=albums_list_filtered, artist=artist_filtered)
    return (artist, albums_list)
        
def htmlize_artists_page(artists):
    template_path = 'artist.html.jinja'
    artist_html_file_path = HTML_ROOT + 'artists.html'
    artists_list_filtered = []
    for artist in artists:
        artist = artist[0]
        artist_filtered = {
            'name': artist['name'],
            'url': artist['external_urls']['spotify'],
            'html_path': artist['html_path'],
            'img_path': artist['img_path'],
            'num_albums': artist['num_albums']
        }
        artists_list_filtered.append(artist_filtered)

    artists_list_filtered = [artists_list_filtered[i: i + 2] for i in range(0, len(artists_list_filtered),2)]
    insert_into_html_template(template_path, artist_html_file_path, artists_list=artists_list_filtered)
        
def get_songs_from_spotify (album_id):
    headers = {
        'authorization': BEARER_TOKEN,
    }
    
    params = {
        'market': 'IN',
        'include_groups': 'album',
        'limit': 50,
    }

    album_req_url = f'https://api.spotify.com/v1/albums/{album_id}'
    album = json.loads(requests.get(album_req_url, params=params, headers=headers).text)

    tracks = album['tracks']
    return htmlize_songs_page(album, [item for item in tracks['items']])
        
        
def get_albums_from_spotify (artist_id):
    headers = {
        'authorization': BEARER_TOKEN,
    }
    
    params = {
        'market': 'IN',
        'include_groups': 'album',
        'limit': 50
    }

    artist_req_url = f'https://api.spotify.com/v1/artists/{artist_id}'
    artist = json.loads(requests.get(artist_req_url, params=params, headers=headers).text)
    print(f"Artist: [bold]{artist['name']}[\bold]")
    
    albums_req_url = f'https://api.spotify.com/v1/artists/{artist_id}/albums'
    response = requests.get(albums_req_url, params=params, headers=headers)
    albums = json.loads(response.text)

    albums_selected = []
    for item in albums['items']:
        print(f"[link={item['external_urls']['spotify']}]{item['name']}[/link] (Artist: {artist['name']}): Released {item['release_date'].split('-')[0]}, {item['total_tracks']} Songs")
        add_to_list = prompt.Confirm.ask("Add album?")
        if (add_to_list):
            albums_selected.append(get_songs_from_spotify(item['id']))

    return htmlize_albums_page (artist, albums_selected)

def search_get_artist_id(search_query, artists):
    headers = {
        'authorization': BEARER_TOKEN,
    }
    
    params = {
        'q': search_query,
        'type': 'artist',
        'limit': 50
    }

    search_data = json.loads(requests.get('https://api.spotify.com/v1/search', params=params, headers=headers).text)
    try:
        if (search_data['artists']['total'] != 0):
            for item in search_data['artists']['items']:
                print(f"[link={item['external_urls']['spotify']}]{item['name']}[/link]")
                if (prompt.Confirm.ask("Add artist?")):
                    albums_selected = get_albums_from_spotify(item['id'])
                    artists.append(albums_selected)
                    return artists
                    break
        else:
            print(search_data)
            return artists
    finally:
        return artists
        print("Done!")
            
            
if __name__ == '__main__':
    print("To exit, enter nothing")
    artists = []
    while (True):
        print()
        name = prompt.Prompt.ask("Search for artists")
        if (name == ''):
            break
        artists = search_get_artist_id(name, artists)

    htmlize_artists_page(artists)
