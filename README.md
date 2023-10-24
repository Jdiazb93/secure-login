# ventipay
Prueba técnica ventiPay


## Paso a Paso

Para levantar el servidor de backend, se necesita hacer la instalación de los módulos por completo, para esto se debe utilizar el comando:

```bash
npm i 
# o 
npm install
```

DBB SQLITE ORM [Prisma](https://www.prisma.io/)

Se debe crear un documento .env en la carpeta back, y el contenido es el siguiente:

```bash
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="file:./dev.db"
```

Para ejecutar la base de datos, se debe levantar con el comando

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
npm run start #Esto levantará por defecto un servidor local en localhost:3000
```