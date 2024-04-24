import { HttpException, Injectable } from '@nestjs/common';
import { trelloClient, defaultAuthBody } from 'src/bot-trello/Req.Client';
import { Colors } from '../Objects/colors.enum';
import { Label } from '../Objects/Label';
import { Setores } from 'src/setores/entities/setores.entity';

@Injectable()
export class LabelService {

    async createLabel({ name, color, idBoard }: { name: string, color: string, idBoard: string }) {
        try {
            const url = `labels?name=${encodeURIComponent(name)}&color=${color}&idBoard=${idBoard}&key=${process.env.api_key}&token=${process.env.api_token}`
            console.log(url)
            await trelloClient.post(url)
        }
        catch (err) {
            throw new HttpException(`nao foi possivel criar a etiqueta\n ${err}`, 500)
        }
    }

    async checkLabels(idBoard: string, setores: Setores[]): Promise<Label[]> {
        const labels = (await this.getLabelinBoard(idBoard)).map(label => label.name)
        const requiredLabels = setores.map(setor => setor.nome)
        const result = requiredLabels.every(label => labels.includes(label))//verifica se tem os labels no quadro > treu : false >
        if (result) return
        const missing = this.missingLabels(requiredLabels, labels)
        missing.forEach(
            miss => {
                const color = this.randomColor()
                console.log(color)
                this.createLabel({
                    color: color,
                    name: miss,
                    idBoard: idBoard
                })
            }
        )
    }
    private missingLabels(required: string[], current: string[]): string[] {
        const missing = required.filter(require => !(current.includes(require)))
        return missing
    }

    private randomColor(): string {
        const max = Object.values(Colors).length / 2
        const min = 0
        const value = Math.floor(Math.random() * (max - min + 1)) + min;
        return Colors[value]//volta cor aleatoria para o label
    }

    async getLabelinBoard(idboard: string): Promise<Label[]> {
        const { data } = await trelloClient.get(`https://api.trello.com/1/boards/${idboard}/labels?key=${process.env.api_key}&token=${process.env.api_token}`)
        return data.filter((label) => label.name)
    }
}
