

import fastify from "fastify";

import cors from "@fastify/cors";

import { request } from "http";

const server = fastify({logger: true});

server.register(cors, {
    origin: "*",
})

const teams = [
    {id: 1, nome: "Ferrari", base: "Working, United Kingdom"},
    {id: 2, nome: "Mercedes", base: "Brackley, United Kingdom"},
    {id: 3, nome: "Red Bull Racing", base: "Milton Keynes, United Kingdom"}];

    const drivers = [
        {id: 1, name: "Max Verstappen", team: "Red Bull Racing"},
        {id: 2, name: "Lewis Hamilton", team: "Ferrari"},
        {id: 3, name: "Lando Norris", team: "McLine"}
    ]

server.get("/teams", async (request, Response)=>{
    Response.type("application/json").code(200);
    return {teams};
});

server.get("/drivers", async( request, Response)=>{
    Response.type("application/json").code(200);

    return{drivers};
})

interface DriverParams{
    id: string
}

server.get<{Params: DriverParams}>("/drivers/:id", async(request, Response) =>{
    const id = parseInt(request.params.id);
    const driver = drivers.find((d) => d.id === id);

    if(!driver){
        Response.type("application/json").code(404);
        return {message: "Drivers Not Fund"};
    }else{
        Response.type("application/json").code(200);
        return {driver}
    }
})

server.listen({port: 3333}, ()=>{
    console.log("Server init");
});