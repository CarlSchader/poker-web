USERNAME = carlschader

run:
	docker compose -f docker/docker-compose.yaml up --build

kill:
	docker compose -f docker/docker-compose.yaml down

build:
	docker build -t poker-web:latest -f docker/Dockerfile .

publish:
	docker login

	docker build -t ${USERNAME}/poker-web:arm -f docker/Dockerfile-arm .
	docker build -t ${USERNAME}/poker-web:amd -f docker/Dockerfile-amd .

	docker push ${USERNAME}/poker-web:arm
	docker push ${USERNAME}/poker-web:amd
	
	docker manifest create \
	${USERNAME}/poker-web:latest \
	--amend ${USERNAME}/poker-web:arm \
	--amend ${USERNAME}/poker-web:amd

	docker manifest push ${USERNAME}/poker-web:latest