import base64
import tempfile
import zipfile
import uuid
import os
from starlette.config import Config

config = Config(".env")
app_path = config('APP_PATH')


def unzip_episode(base64_file):
    starter = base64_file.find(',')
    file_data = base64_file[starter + 1:]
    file_data = bytes(file_data, encoding="ascii")

    episode_filename = f'{tempfile.NamedTemporaryFile().name}.zip'

    episode_file = open(episode_filename, 'wb')
    episode_file.write(base64.decodebytes(file_data))
    episode_file.close()
    episode_uuid = str(uuid.uuid4())

    episode_folder = f'{app_path}/public/{episode_uuid}'
    os.mkdir(episode_folder)

    episode_zip = zipfile.ZipFile(episode_filename)
    episode_zip.extractall(path=episode_folder)
    pages = [item.filename for item in episode_zip.infolist()]

    return {
        'pages': pages,
        'episode_uuid': episode_uuid
    }
