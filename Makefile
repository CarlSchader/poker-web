run:
	docker compose -f docker/docker-compose.yaml up --build

build:
	docker build -t carlschader/poker-web -f docker/Dockerfile .

publish:
	docker login

	docker build -t carlschader/poker-web:arm -f docker/Dockerfile-arm .
	docker build -t carlschader/poker-web:amd -f docker/Dockerfile-amd .

	docker push carlschader/poker-web:arm
	docker push carlschader/poker-web:amd
	
	docker manifest create \
	carlschader/poker-web:latest \
	carlschader/poker-web:arm \
	carlschader/poker-web:amd

	docker manifest push carlschader/poker-web:latest