import { ApiProperty } from '@nestjs/swagger';

export class CreateIdleDto {
    @ApiProperty({ description: 'filename' })
    filename: string;
    @ApiProperty({ description: 'happenDt' })
    happenDt: string;
    @ApiProperty({ description: 'happenPlace' })
    happenPlace: string;
    @ApiProperty({ description: 'kindCd' })
    kindCd: string;
    @ApiProperty({ description: 'colorCd' })
    colorCd: string;
    @ApiProperty({ description: 'age' })
    age: string;
    @ApiProperty({ description: 'weight' })
    weight: string;
    @ApiProperty({ description: 'noticeNo' })
    noticeNo: string;
    @ApiProperty({ description: 'noticeSdt' })
    noticeSdt: string;
    @ApiProperty({ description: 'noticeEdt' })
    noticeEdt: string;
    @ApiProperty({ description: 'popfile' })
    popfile: string;
    @ApiProperty({ description: 'processState' })
    processState: string;
    @ApiProperty({ description: 'sexCd' })
    sexCd: string;
    @ApiProperty({ description: 'neuterYn' })
    neuterYn: string;
    @ApiProperty({ description: 'specialMark' })
    specialMark: string;
    @ApiProperty({ description: 'careNm' })
    careNm: string;
    @ApiProperty({ description: 'careTel' })
    careTel: string;
    @ApiProperty({ description: 'careAddr' })
    careAddr: string;
    @ApiProperty({ description: 'orgNm' })
    orgNm: string;
    @ApiProperty({ description: 'chargeNm' })
    chargeNm: string;
    @ApiProperty({ description: 'officetel' })
    officetel: string;
}
