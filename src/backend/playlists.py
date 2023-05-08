from flask import Flask, request, render_template
import sqlite3
import json

# Setup for flask app and database
app = Flask(__name__)
SQLITE_DB = "db.sqlite3"


def query_db(*args, **kw_args):
    con = sqlite3.connect(SQLITE_DB)
    cur = con.cursor()
    result = cur.execute(*args, **kw_args).fetchall()
    con.commit()
    cur.close()
    con.close()
    return result

def get_all_songs():
    result = query_db("""
    SELECT name, img, artist, album, duration, id
    FROM songs; """)
    return render_template('display_playlist_template.html', data=[
        {"name": _[0],
         "img": _[1],
         "artist": _[2],
         "album": _[3],
         "duration": _[4],
         "id": _[5]}
        for _ in result])

@app.after_request
def apply_caching(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,DELETE"
    return response

@app.route("/playlist/remove/<id>", methods=["DELETE"])
def remove_from_playlist(id):
    query_db("""
    DELETE FROM songs
    WHERE 
    id LIKE ?;""", (id,))
    return get_all_songs()

@app.route("/playlist/add", methods=["POST"])
def add_to_playlist():
    details = request.form.to_dict()

    name = details['name']
    artist = details['artist']
    duration = details['duration']
    album = details['album']
    img = details['img']

    song_str = str(name) + str(artist) + str(duration) + str(album)

    import hashlib
    hash = hashlib.sha1(song_str.encode('utf-8')).hexdigest()[:10]

    query_db("""
    INSERT OR IGNORE INTO
        songs (id, name, img, artist, album, duration)
    VALUES (?, ?, ?, ?, ?, ?) """, (
    hash, name, img, artist, album, duration
    ))
    return "Song added to playlist!", 201

@app.route("/playlist/display")
def display_playlist():
    return get_all_songs()


if __name__ == '__main__':
    query_db("""
    CREATE TABLE IF NOT EXISTS songs (
        id, name, img, artist, album, duration,
        UNIQUE(id)
    );
    """)
    app.run(debug=True)
