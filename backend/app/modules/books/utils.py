import base64
import tempfile
import zipfile
import uuid
import os
import shutil
from starlette.config import Config

config = Config(".env")
upload_path = config('UPLOAD_PATH')


def unzip_episode(file_content):
    episode_filename = f'{tempfile.NamedTemporaryFile().name}.zip'
    episode_file = open(episode_filename, 'wb')
    episode_file.write(file_content)
    episode_file.close()
    episode_uuid = str(uuid.uuid4())

    episode_folder = f'{upload_path}/public/{episode_uuid}'
    os.mkdir(episode_folder)

    episode_zip = zipfile.ZipFile(episode_filename)
    episode_zip.extractall(path=episode_folder)
    pages = [item.filename for item in episode_zip.infolist()]
    pages.sort()

    return {
        'pages': pages,
        'uuid': episode_uuid
    }


def remove_episode(episode_uuid):
    shutil.rmtree(f'{upload_path}/public/{episode_uuid}')


async def upload_cover(file):
    filename, file_extension = os.path.splitext(file.filename)
    cover_uuid = str(uuid.uuid4())
    cover_filename = f'{cover_uuid}{file_extension}'
    cover_folder = f'{upload_path}/public/'
    cover_file = open(f'{cover_folder}{cover_filename}', 'wb')
    content = await file.read()
    cover_file.write(content)

    return cover_filename


async def update_cover(file, cover_filename):
    cover_folder = f'{upload_path}/public/'
    cover_file = open(f'{cover_folder}{cover_filename}', 'wb')
    content = await file.read()
    cover_file.write(content)


def remove_cover(cover_filename):
    cover_folder = f'{upload_path}/public/'
    os.remove(f'{cover_folder}{cover_filename}')
