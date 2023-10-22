# ventipay
Prueba técnica ventiPay


## Paso a Paso

Para levantar el servidor de backend, se necesita hacer la instalación de los módulos por completo, para esto se debe utilizar el comando:

```bash
npm i 
# o 
npm install
```

Luego se debe levantar la base de datos, para este caso se utilizó base de datos sqlite, utilizando el ORM [Prisma](https://www.prisma.io/)

```bash
npx prisma init --datasource-provider sqlite #Este comando creará lo necesario para levantar la base de datos, incluyendo un documento .env
```

Finalmente, para ejecutar la base de datos, se debe levantar con el comando

```bash
npx prisma migrate dev --name init #Este comando finalmente levanta la base de datos.
```



## Opcional - BDD

Si desea ver la bdd, puede ejecutar el siguiente comando:

```bash
npx prisma studio #Esto levantará un servicio local en localhost:5555 para ver la bdd.
```

## Levantar Servicios de Back

Para ejecutar el backend, solo se debe correr el comando

```bash
npm run dev #Con este comando se ejecuta el servidor, si todo va bien debería entregar un mensaje tipo: http://localhost:5000/api/v1/
```

## Levantar Front

Para ejecutar el front de la aplicación, primero instalar dependencias:

```bash
npm install 
#or
npm i
```

Luego ejecutar el comando

```bash
npm run start
```