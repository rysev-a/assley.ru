cd frontend;
# ng build --prod;
cd ../;
7z a dist.zip frontend/dist/frontend;
ssh alexeyrysev@air-sites.ru "cd /home/alexeyrysev/assley.ru/public; rm -r ./*";
scp dist.zip alexeyrysev@air-sites.ru:/home/alexeyrysev/assley.ru/public/;
ssh  alexeyrysev@air-sites.ru "cd /home/alexeyrysev/assley.ru/public; unzip dist.zip; cp -r frontend/dist/frontend/* ./"
