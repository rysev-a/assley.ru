import base64
import tempfile
import zipfile
import uuid
import os
from starlette.config import Config

config = Config(".env")
app_path = config('APP_PATH')


def unzip_episode(file_content):
    episode_filename = f'{tempfile.NamedTemporaryFile().name}.zip'
    episode_file = open(episode_filename, 'wb')
    episode_file.write(file_content)
    episode_file.close()
    episode_uuid = str(uuid.uuid4())

    episode_folder = f'{app_path}/public/{episode_uuid}'
    os.mkdir(episode_folder)

    episode_zip = zipfile.ZipFile(episode_filename)
    episode_zip.extractall(path=episode_folder)
    pages = [item.filename for item in episode_zip.infolist()]

    return {
        'pages': pages,
        'uuid': episode_uuid
    }
