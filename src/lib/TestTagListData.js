

export const TestTagListData=[
    //タイプ1　そこから関数や処理を実行する可能性があるもの
    //タイプ2　サービス利用者につけるもの
    //タイプ3　サービス運営者・働いているメンバーにつけるもの　自由入力で選択すると通知が付く
    //タイプ4　単純に言葉につけるもの 基本セット　一番利用する。
    //タイプ5　値につけるもの、このタイプのデータにはvalue値が付く
    //タイプ6　分類用タイプ　自身には意味はあまりなく、他のタグをまとめるために存在する　valueは他のタグのリストを持つ(今後使うかはまだ不明)
    //タイプ7　ユーザーが自由に追加する言葉。
    
    //タグのメインデータと定例入力用タグのデータは別にして、定例入力はメインデータを紐づけして呼び出される。
    //全てのタグデータが定例入力データを持つわけではなく、　同じタグデータが別の定例入力のデータを持つ可能性がある。


    {id:1,type:1,name:"全体"},
    
    {id:2,type:1,name:"重要"},
    {id:3,type:1,name:"緊急"},

    {id:15,type:3,name:"7番街"},
    {id:25,type:3,name:"1番街"},


    {id:42,type:2,name:"長谷川"},
    {id:43,type:2,name:"山上"  },
    {id:54,type:2,name:"山本" },
    {id:66,type:2,name:"小林"  },
    {id:67,type:3,name:"高橋"  },
    {id:68,type:3,name:"鈴木"  },
    {id:69,type:3,name:"伊藤" },
    {id:102,type:5,name:"登録時間" },
    

    {id:8,type:4,name:"排泄"  },
    {id:10,type:4,name:"入浴" },
    {id:11,type:4,name:"食事" },
    {id:12,type:4,name:"自力" },
    {id:13,type:4,name:"介助" },
    
    {id:15,type:4,name:"徘徊" },
    {id:19,type:4,name:"少し" },
    {id:20,type:4,name:"半分"},
    {id:21,type:4,name:"全て"},
    {id:34,type:4,name:"シャワー"},
    {id:46,type:4,name:"洗身"},
    {id:70,type:6,name:"バイタル"},
    {id:71,type:6,name:"血圧"},
    {id:72,type:5,name:"脈拍"},
    
    {id:73,type:5,name:"最高"},
    {id:74,type:5,name:"最低"},
];


export const FormedTagInputData=[
    {id:1,type:1,name:"7番街",phase:1,　group:"unit",  show:[],del:[] },
    {id:2,type:1,name:"1番街",phase:1, 　group:"unit", show:[],del:[] },

    {id:42,type:1,name:"長谷川",phase:-1,　group:"user", show:[1],del:[] },
    {id:43,type:1,name:"山上" ,phase:-1, 　group:"user",show:[1],del:[] },
    {id:54,type:1,name:"山本" ,phase:-1, 　group:"user",show:[1],del:[] },
    {id:66,type:1,name:"小林" ,phase:-1, 　group:"user",show:[2],del:[] },
    {id:102,type:14,name:"登録時間" , phase:-1,show:[42,43],del:[] },
    

    {id:8,type:2,name:"排泄"  , group:"action",phase:2,show:[],del:[]},
    {id:10,type:2,name:"入浴" , group:"action",phase:2,show:[],del:[]},
    {id:11,type:2,name:"食事" , group:"action",phase:2,show:[],del:[]},
    {id:12,type:2,name:"自力" , group:"meel_style", phase:-1,show:[11],del:[13]},
    {id:13,type:2,name:"介助" ,group:"meel_style",phase:-1,show:[11],del:[12]},
    
    {id:15,type:2,name:"徘徊" ,group:"action",phase:2,show:[],del:[8,10,11]},
    {id:19,type:3,name:"少し" , group:"meel_amount", phase:-1,show:[12,13],del:[20,21]},
    {id:20,type:3,name:"半分", group:"meel_amount", phase:-1,show:[12,13],del:[19,21]},
    {id:21,type:3,name:"全て", group:"meel_amount", phase:-1,show:[12,13],del:[19,20]},
    {id:34,type:3,name:"シャワー",  group:"bath_style",phase:-1,show:[10],del:[46]},
    {id:46,type:3,name:"洗身", group:"bath_style", phase:-1,show:[10],del:[34]},
    {id:70,type:2,name:"バイタル", group:"action", phase:2,show:[],del:[8,10,11,15]},
    {id:71,type:2,name:"血圧", group:"bytal_type", phase:-1,show:[70],del:[72]},
    {id:72,type:2,name:"脈拍",  group:"bytal_type", phase:-1,show:[70],del:[71]},
    
    {id:73,type:11,name:"最高",phase:-1,show:[71],del:[]},
    {id:74,type:11,name:"最低",phase:-1,show:[73],del:[]},
];
