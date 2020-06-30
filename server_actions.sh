cd /home/alexeyrysev/assley.ru/public;
rm -r !(dist.zip) ./*
unzip dist.zip;
cp -r frontend/dist/frontend/* ./
