# Content Manager

The content manager for my own personal & professional website, made with Strapi and customized using TypeScript.

![Content Manager Illustration](https://res.cloudinary.com/deexzd1vz/image/upload/v1690834456/content-manager_bvnjx2.png)

The content manager stores & serves the following information:

* Article
* Article Category
* Article Tag
* Audio Track
* Background Image
* Coding Framework
* Coding Language
* Constant
* Content
* Experience
* Gear
* Link
* Project
* Service

## Build System

The project can run "the standard way" on a terminal using a package manager (e.g. Yarn, Npm, and so on...) or through
docker using the provided Dockerfile and docker-compose files.

### `The old way`

In order to run it "the standard way", we first need to install the dependencies.

```shell
$> yarn install
```

Then if you want to start the server in "Edit Mode", in order to update the content types, you'll need to start the application using the "develop" script.

```shell
$> yarn develop
```

Otherwise, you simply need to start it using the "start" script.

```shell
$> yarn start
```

### `Using Docker`

Using docker, you will simply need to first install `docker-compose` and use the following command.

```
docker-compose up
```
