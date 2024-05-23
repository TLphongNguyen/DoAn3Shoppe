import { Customer } from "@prisma/client"
const express = require("express")

declare module 'express' {
    export interface Request {
        customer: Customer;
    }
}
