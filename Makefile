up:
	docker-compose up -d
build:
	docker-compose up -d --build
down:
	docker-compose down
delete:
	docker-compose down -v
destroy:
	docker-compose down -v --rmi all
restart:
	@make down
	@make up
migrate:
	docker-compose exec php-fpm php artisan migrate:fresh --seed
watch:
	docker-compose exec nginx npm run watch
route:
	docker-compose exec php-fpm php artisan route:list -c
install-laravel:
	docker-compose exec php-fpm composer create-project --prefer-dist laravel/laravel .