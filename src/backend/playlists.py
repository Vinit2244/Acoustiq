from flask import Flask, request
import sqlite3

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

    query_db(f"""
    INSERT OR IGNORE INTO
        songs (id, name, img, artist, album, duration)
    VALUES {
    hash, name, img, artist, album, duration
    }
    """)
    return "Song added to playlist!", 201


@app.route("/playlist/display")
def display_playlist():
    result = query_db("""
    SELECT name, img, artist, album, duration
    FROM songs; """)
    return str([{"name": _[0], "img": _[1], "artist": _[2], "album": _[3], "duration": _[4]}
            for _ in result]), {'ContentType':'application/json'}


if __name__ == '__main__':
    query_db("""
    CREATE TABLE IF NOT EXISTS songs (
        id, name, img, artist, album, duration,
        UNIQUE(id)
    );
    """)
    app.run(debug=True)
