import { Module } from '@nestjs/common';
import { LabelService } from './labelService/label.service';

@Module({
    providers: [LabelService],
    exports: [LabelService]
})
export class LabelModule { }
