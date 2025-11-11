import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def get_db_connection():
    '''
    Business: Create database connection using DATABASE_URL
    Returns: psycopg2 connection object
    '''
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API for managing music content (albums, tracks, videos, lyrics)
    Args: event with httpMethod, body, queryStringParameters
    Returns: HTTP response with JSON data
    '''
    method: str = event.get('httpMethod', 'GET')
    path = event.get('queryStringParameters', {}).get('path', '')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'GET':
            if path == 'albums':
                cur.execute('''
                    SELECT a.*, 
                           json_agg(
                               json_build_object(
                                   'id', t.id,
                                   'title', t.title,
                                   'audio_url', t.audio_url,
                                   'duration', t.duration
                               ) ORDER BY t.id
                           ) FILTER (WHERE t.id IS NOT NULL) as tracks
                    FROM albums a
                    LEFT JOIN tracks t ON a.id = t.album_id
                    GROUP BY a.id
                    ORDER BY a.created_at DESC
                ''')
                albums = cur.fetchall()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps([dict(album) for album in albums], default=str),
                    'isBase64Encoded': False
                }
            
            elif path == 'videos':
                cur.execute('SELECT * FROM videos ORDER BY created_at DESC')
                videos = cur.fetchall()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps([dict(v) for v in videos], default=str),
                    'isBase64Encoded': False
                }
            
            elif path == 'lyrics':
                cur.execute('SELECT * FROM lyrics ORDER BY created_at DESC')
                lyrics = cur.fetchall()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps([dict(l) for l in lyrics], default=str),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            if path == 'album':
                cur.execute(
                    'INSERT INTO albums (title, year, cover_url) VALUES (%s, %s, %s) RETURNING id',
                    (body.get('title'), body.get('year'), body.get('cover_url'))
                )
                album_id = cur.fetchone()['id']
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'id': album_id, 'success': True}),
                    'isBase64Encoded': False
                }
            
            elif path == 'track':
                cur.execute(
                    'INSERT INTO tracks (album_id, title, audio_url, duration) VALUES (%s, %s, %s, %s) RETURNING id',
                    (body.get('album_id'), body.get('title'), body.get('audio_url'), body.get('duration'))
                )
                track_id = cur.fetchone()['id']
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'id': track_id, 'success': True}),
                    'isBase64Encoded': False
                }
            
            elif path == 'video':
                cur.execute(
                    'INSERT INTO videos (title, video_url, thumbnail_url, duration) VALUES (%s, %s, %s, %s) RETURNING id',
                    (body.get('title'), body.get('video_url'), body.get('thumbnail_url'), body.get('duration'))
                )
                video_id = cur.fetchone()['id']
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'id': video_id, 'success': True}),
                    'isBase64Encoded': False
                }
            
            elif path == 'lyric':
                cur.execute(
                    'INSERT INTO lyrics (title, text) VALUES (%s, %s) RETURNING id',
                    (body.get('title'), body.get('text'))
                )
                lyric_id = cur.fetchone()['id']
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'id': lyric_id, 'success': True}),
                    'isBase64Encoded': False
                }
        
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid path or method'}),
            'isBase64Encoded': False
        }
    
    finally:
        cur.close()
        conn.close()
