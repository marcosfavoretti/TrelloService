import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IEmail } from '../Objects/IEmail';

@Injectable()
export class EmailService {
    //api de email local para envio de email
    private readonly axios_client = axios.create({
        baseURL: "http://192.168.99.102:3002"
    })

    async sendEmail(email: IEmail) {
        await this.axios_client.post('/email', {
            ...email
        }).then(() => {
            console.log('email enviado')
        }).catch(err =>
            console.log(err)
        )
    }
}
