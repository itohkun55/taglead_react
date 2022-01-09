
export const TAG_IMPORTANT=1;
export const TAG_NORMAL=2;
export const TAG_DEFAULT=3;

export const TAG_NUMBER_INPUT=11;
export const TAG_DATE_INPUT=12;
export const TAG_TIME_INPUT=14;
export const TAG_DATE_TIME_INPUT=15;
export const TAG_TEXT_INPUT=13;
export const TAG_MULTILINE_INPUT=16;
export const TAG_SELECT_BOX=17;


export const TYPE_TAG_FUNCTION=1;
export const TYPE_TAG_MEMBER=2;
export const TYPE_TAG_GUEST=3;
export const TYPE_TAG_ACTION=4;
export const TYPE_TAG_OTHER_ELSE=5;
export const TYPE_TAG_PLACE=6;


export const TAG_TYPES=[
    {id:TYPE_TAG_GUEST,name:"利用者"},
    {id:TYPE_TAG_ACTION,name:"業務用語"},
    {id:TYPE_TAG_PLACE,name:"部署・場所"},
    {id:TYPE_TAG_OTHER_ELSE,name:"施設内用語"}
    
];

export const TAG_RANKS=[
    {id:1000,name:"最重要"},
    {id:100,name:"重要"},
    {id:10,name:"通常"},
    {id:1,name:"表示のみ"},
]