import click


@click.command()
def runserver():
    click.echo('run server')


if __name__ == '__main__':
    runserver()
