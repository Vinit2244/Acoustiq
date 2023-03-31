from rich import print, prompt
import json
import requests
import os
from slugify import slugify
import shutil

# Insert your bearer token here
# TODO: Mechanism to create bearer tokens on the fly
BEARER_TOKEN = ''

IMG_ROOT = './src/media/'

def htmlize_songs_page (album, songs_list):
    album_cover_art_path = IMG_ROOT + f'albums/{slugify(album["name"])}.jpeg'
    album_cover_art_url = album['images'][0]['url']

    # https://stackoverflow.com/a/18043472
    image = requests.get(album_cover_art_url, stream=True)
    image.raw.decode_content = True
    with open(album_cover_art_path, 'wb') as outfile:
        shutil.copyfileobj(image.raw, outfile)
    del image
    print("Album Cover Art Downloaded :white_check_mark:")
    
    for song in songs_list:
        print(f"Song Name: {song['name']}; URL: {song['external_urls']['spotify']}")

    print()
        
def htmlize_albums_page (artist, albums_list):
    album_cover_art_path = IMG_ROOT + f'artists/{slugify(artist["name"])}.jpeg'
    album_cover_art_url = artist['images'][0]['url']

    # https://stackoverflow.com/a/18043472
    image = requests.get(album_cover_art_url, stream=True)
    image.raw.decode_content = True
    with open(album_cover_art_path, 'wb') as outfile:
        shutil.copyfileobj(image.raw, outfile)
    del image
    
    print("Artist Cover Image Downloaded :white_check_mark:")

    for album in albums_list:
        print(f"Album Name: {album['name']}; URL: {album['external_urls']['spotify']}")

def get_songs_from_spotify (album_id):
    headers = {
        'authorization': BEARER_TOKEN,
    }
    
    params = {
        'market': 'IN',
        'include_groups': 'album'
    }

    album_req_url = f'https://api.spotify.com/v1/albums/{album_id}'
    album = json.loads(requests.get(album_req_url, params=params, headers=headers).text)

    tracks = album['tracks']

    htmlize_songs_page(album, [item for item in tracks['items']])
        
        
def get_albums_from_spotify (artist_id):
    headers = {
        'authorization': BEARER_TOKEN,
    }
    
    params = {
        'market': 'IN',
        'include_groups': 'album'
    }

    artist_req_url = f'https://api.spotify.com/v1/artists/{artist_id}'
    artist = json.loads(requests.get(artist_req_url, params=params, headers=headers).text)
    print(f"Artist: [bold]{artist['name']}[\bold]")
    
    albums_req_url = f'https://api.spotify.com/v1/artists/{artist_id}/albums'
    response = requests.get(albums_req_url, params=params, headers=headers)
    albums = json.loads(response.text)

    albums_selected = []
    for item in albums['items']:
        print(f"Album Name: {item['name']}, URL: {item['external_urls']['spotify']}")
        add_to_list = prompt.Confirm.ask("Add album?")
        if (add_to_list):
            get_songs_from_spotify(item['id'])
            albums_selected.append(item)

    htmlize_albums_page (artist, albums_selected)

def search_get_artist_id(search_query):
    headers = {
        'authorization': BEARER_TOKEN,
    }
    
    params = {
        'q': search_query,
        'type': 'artist',
    }

    search_data = json.loads(requests.get('https://api.spotify.com/v1/search', params=params, headers=headers).text)
    if (search_data['artists']['total'] != 0):
        for item in search_data['artists']['items']:
            print(f"Artist Name: {item['name']}, URL: {item['external_urls']['spotify']}")
            if (prompt.Confirm.ask("Add artist?")):
                get_albums_from_spotify(item['id'])
                break
    
if __name__ == '__main__':
    name = prompt.Prompt.ask("Search for artists")
    search_get_artist_id(name)
