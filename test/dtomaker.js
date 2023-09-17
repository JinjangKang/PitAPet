function dtomaker(arr) {
    for (let dto of arr) {
        console.log(`@ApiProperty({ description: '${dto}' })
        ${dto}: string;`);
    }
}

dtomaker([
    'lostNo',
    'type',
    'sexCd',
    'age',
    'weight',
    'furColor',
    'feature',
    'image',
    'lostPlace',
    'lostDate',
    'tel',
    'reward',
    'title',
    'detail',
]);
