// 句子剖析数据 - 包含10个句子的详细分析（测试版本）
export interface SentenceAnalysis {
  id: string;
  sentence: string;
  translation: string;
  difficulty: '青铜' | '白银' | '黄金' | '钻石';
  structure: SentenceStructure;
  logicRelations: LogicRelation[];
  similarPatterns: SimilarPattern[];
  grammarPoints: GrammarPoint[];
}

interface SentenceStructure {
  mainClause: string;
  subordinateClauses: SubordinateClause[];
  phrases: Phrase[];
  words: Word[];
}

interface SubordinateClause {
  type: string;
  content: string;
  function: string;
  connector?: string;
}

interface Phrase {
  type: string;
  content: string;
  function: string;
}

interface Word {
  word: string;
  partOfSpeech: string;
  function: string;
}

interface LogicRelation {
  type: string;
  description: string;
  examples: string[];
}

interface SimilarPattern {
  pattern: string;
  examples: string[];
  usage: string;
}

interface GrammarPoint {
  point: string;
  explanation: string;
  examples: string[];
}

export const analysisSentences: SentenceAnalysis[] = [
  {
    "id": "1",
    "sentence": "Although he was tired, he continued working.",
    "translation": "虽然他很累，但他继续工作。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "he continued working",
      "subordinateClauses": [
        {
          "type": "让步状语从句",
          "content": "Although he was tired",
          "function": "表示让步，说明尽管有困难但仍然继续",
          "connector": "Although"
        }
      ],
      "phrases": [
        {
          "type": "现在分词短语",
          "content": "continued working",
          "function": "表示持续的动作"
        }
      ],
      "words": [
        {
          "word": "Although",
          "partOfSpeech": "连词",
          "function": "引导让步状语从句"
        },
        {
          "word": "tired",
          "partOfSpeech": "形容词",
          "function": "作表语，表示状态"
        },
        {
          "word": "continued",
          "partOfSpeech": "动词",
          "function": "谓语动词，表示动作"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "让步关系",
        "description": "表示尽管存在某种情况，但结果仍然发生",
        "examples": [
          "Although it was raining, we went out.",
          "Even though he was busy, he helped me.",
          "Though he was young, he was very wise."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "Although/Even though/Though + 从句, 主句",
        "examples": [
          "Although he was tired, he continued working.",
          "Even though it was late, she didn't go to bed.",
          "Though he was poor, he was happy."
        ],
        "usage": "用于表达让步关系，表示尽管有某种情况，但结果仍然发生"
      }
    ],
    "grammarPoints": [
      {
        "point": "让步状语从句",
        "explanation": "由although, even though, though等连词引导，表示让步关系",
        "examples": [
          "Although he was tired, he continued working.",
          "Even though it was expensive, I bought it.",
          "Though he was young, he was experienced."
        ]
      }
    ]
  },
  {
    "id": "2",
    "sentence": "The book which I bought yesterday is very interesting.",
    "translation": "我昨天买的那本书很有趣。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "The book is very interesting",
      "subordinateClauses": [
        {
          "type": "定语从句",
          "content": "which I bought yesterday",
          "function": "修饰先行词book，说明是哪本书",
          "connector": "which"
        }
      ],
      "phrases": [
        {
          "type": "形容词短语",
          "content": "very interesting",
          "function": "作表语，表示书的特征"
        }
      ],
      "words": [
        {
          "word": "which",
          "partOfSpeech": "关系代词",
          "function": "引导定语从句，指代book"
        },
        {
          "word": "bought",
          "partOfSpeech": "动词",
          "function": "定语从句中的谓语动词"
        },
        {
          "word": "interesting",
          "partOfSpeech": "形容词",
          "function": "作表语，表示特征"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "修饰关系",
        "description": "定语从句修饰先行词，提供更多信息",
        "examples": [
          "The man who is standing there is my teacher.",
          "The car which I like is expensive.",
          "The house where I live is beautiful."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "名词 + which/that/who + 从句",
        "examples": [
          "The book which I bought is interesting.",
          "The man who helped me is kind.",
          "The car that I drive is new."
        ],
        "usage": "用于修饰名词，提供更多相关信息"
      }
    ],
    "grammarPoints": [
      {
        "point": "定语从句",
        "explanation": "修饰名词或代词的从句，由关系代词或关系副词引导",
        "examples": [
          "The book which I bought is interesting.",
          "The man who helped me is kind.",
          "The place where I was born is beautiful."
        ]
      }
    ]
  },
  {
    "id": "3",
    "sentence": "If you study hard, you will pass the exam.",
    "translation": "如果你努力学习，你就会通过考试。",
    "difficulty": "青铜",
    "structure": {
      "mainClause": "you will pass the exam",
      "subordinateClauses": [
        {
          "type": "条件状语从句",
          "content": "If you study hard",
          "function": "表示条件，说明在什么情况下会发生结果",
          "connector": "If"
        }
      ],
      "phrases": [
        {
          "type": "动词短语",
          "content": "will pass",
          "function": "表示将来时态的谓语"
        }
      ],
      "words": [
        {
          "word": "If",
          "partOfSpeech": "连词",
          "function": "引导条件状语从句"
        },
        {
          "word": "study",
          "partOfSpeech": "动词",
          "function": "条件从句中的谓语动词"
        },
        {
          "word": "will",
          "partOfSpeech": "助动词",
          "function": "表示将来时态"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "条件关系",
        "description": "表示在某种条件下会产生某种结果",
        "examples": [
          "If it rains, we will stay at home.",
          "If you work hard, you will succeed.",
          "If he comes, I will tell him."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "If + 现在时, 主句 + will + 动词原形",
        "examples": [
          "If you study hard, you will pass the exam.",
          "If it rains tomorrow, we will cancel the picnic.",
          "If he arrives early, we will start the meeting."
        ],
        "usage": "用于表达第一类条件句，表示可能发生的条件"
      }
    ],
    "grammarPoints": [
      {
        "point": "第一类条件句",
        "explanation": "表示可能发生的条件，从句用现在时，主句用将来时",
        "examples": [
          "If you study hard, you will pass the exam.",
          "If it rains, we will stay at home.",
          "If he comes, I will tell him the truth."
        ]
      }
    ]
  },
  {
    "id": "4",
    "sentence": "She said that she would come to the party.",
    "translation": "她说她会来参加聚会。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "She said",
      "subordinateClauses": [
        {
          "type": "宾语从句",
          "content": "that she would come to the party",
          "function": "作为said的宾语，表示说话的内容",
          "connector": "that"
        }
      ],
      "phrases": [
        {
          "type": "介词短语",
          "content": "to the party",
          "function": "表示方向或目的"
        }
      ],
      "words": [
        {
          "word": "said",
          "partOfSpeech": "动词",
          "function": "主句谓语动词"
        },
        {
          "word": "that",
          "partOfSpeech": "连词",
          "function": "引导宾语从句"
        },
        {
          "word": "would",
          "partOfSpeech": "助动词",
          "function": "表示过去将来时"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "转述关系",
        "description": "表示转述某人说过的话",
        "examples": [
          "He told me that he was busy.",
          "She mentioned that she liked the movie.",
          "They explained that the project was delayed."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + 说/告诉动词 + that + 从句",
        "examples": [
          "She said that she would come.",
          "He told me that he was tired.",
          "They explained that it was difficult."
        ],
        "usage": "用于转述他人的话语"
      }
    ],
    "grammarPoints": [
      {
        "point": "宾语从句",
        "explanation": "作为动词宾语的从句，通常由that引导",
        "examples": [
          "She said that she would come.",
          "I believe that he is honest.",
          "He knows that you are right."
        ]
      }
    ]
  },
  {
    "id": "5",
    "sentence": "The weather is so cold that I don't want to go outside.",
    "translation": "天气太冷了，以至于我不想出门。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "The weather is so cold",
      "subordinateClauses": [
        {
          "type": "结果状语从句",
          "content": "that I don't want to go outside",
          "function": "表示结果，说明天气冷到什么程度",
          "connector": "that"
        }
      ],
      "phrases": [
        {
          "type": "不定式短语",
          "content": "to go outside",
          "function": "表示目的或意图"
        }
      ],
      "words": [
        {
          "word": "so",
          "partOfSpeech": "副词",
          "function": "修饰形容词cold，表示程度"
        },
        {
          "word": "that",
          "partOfSpeech": "连词",
          "function": "引导结果状语从句"
        },
        {
          "word": "want",
          "partOfSpeech": "动词",
          "function": "表示意愿"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "因果关系",
        "description": "表示某种情况导致的结果",
        "examples": [
          "It was so hot that we couldn't sleep.",
          "The movie was so boring that I fell asleep.",
          "The food was so delicious that I ate too much."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "so + 形容词/副词 + that + 从句",
        "examples": [
          "The weather is so cold that I don't want to go outside.",
          "He runs so fast that no one can catch him.",
          "The book is so interesting that I can't put it down."
        ],
        "usage": "用于表达程度和结果的关系"
      }
    ],
    "grammarPoints": [
      {
        "point": "so...that结构",
        "explanation": "表示程度和结果的关系，so修饰形容词或副词，that引导结果从句",
        "examples": [
          "The weather is so cold that I don't want to go outside.",
          "He was so tired that he fell asleep immediately.",
          "The problem is so difficult that no one can solve it."
        ]
      }
    ]
  },
  {
    "id": "6",
    "sentence": "I will call you as soon as I arrive.",
    "translation": "我一到达就给你打电话。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "I will call you",
      "subordinateClauses": [
        {
          "type": "时间状语从句",
          "content": "as soon as I arrive",
          "function": "表示时间，说明什么时候打电话",
          "connector": "as soon as"
        }
      ],
      "phrases": [
        {
          "type": "动词短语",
          "content": "will call",
          "function": "表示将来时态的谓语"
        }
      ],
      "words": [
        {
          "word": "as soon as",
          "partOfSpeech": "连词短语",
          "function": "引导时间状语从句，表示'一...就...'"
        },
        {
          "word": "arrive",
          "partOfSpeech": "动词",
          "function": "时间从句中的谓语动词"
        },
        {
          "word": "will",
          "partOfSpeech": "助动词",
          "function": "表示将来时态"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "时间关系",
        "description": "表示两个动作在时间上的先后关系",
        "examples": [
          "I'll start cooking as soon as you come home.",
          "He'll leave as soon as the meeting ends.",
          "We'll begin as soon as everyone arrives."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主句 + as soon as + 从句",
        "examples": [
          "I will call you as soon as I arrive.",
          "He will start working as soon as he gets the information.",
          "We will leave as soon as the rain stops."
        ],
        "usage": "用于表达两个动作的紧密时间关系"
      }
    ],
    "grammarPoints": [
      {
        "point": "as soon as引导的时间从句",
        "explanation": "表示'一...就...'，从句通常用现在时表示将来",
        "examples": [
          "I will call you as soon as I arrive.",
          "He will start as soon as he gets the signal.",
          "We will begin as soon as everyone is ready."
        ]
      }
    ]
  },
  {
    "id": "7",
    "sentence": "Not only did he finish the work, but he also helped others.",
    "translation": "他不仅完成了工作，还帮助了其他人。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "he also helped others",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "倒装结构",
          "content": "Not only did he finish",
          "function": "表示强调和对比"
        }
      ],
      "words": [
        {
          "word": "Not only",
          "partOfSpeech": "连词短语",
          "function": "引导倒装结构，表示强调"
        },
        {
          "word": "did",
          "partOfSpeech": "助动词",
          "function": "用于倒装句"
        },
        {
          "word": "but also",
          "partOfSpeech": "连词短语",
          "function": "表示递进关系"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "递进关系",
        "description": "表示不仅做了一件事，还做了另一件事",
        "examples": [
          "Not only did she pass the exam, but she also got the highest score.",
          "Not only does he work hard, but he also helps his colleagues.",
          "Not only is he intelligent, but he is also kind."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "Not only + 倒装句, but also + 正常语序",
        "examples": [
          "Not only did he finish the work, but he also helped others.",
          "Not only does she speak English, but she also speaks French.",
          "Not only is he tall, but he is also strong."
        ],
        "usage": "用于强调两个相关的事实"
      }
    ],
    "grammarPoints": [
      {
        "point": "Not only...but also结构",
        "explanation": "表示递进关系，not only后通常用倒装语序",
        "examples": [
          "Not only did he finish the work, but he also helped others.",
          "Not only does she work hard, but she also studies well.",
          "Not only is he rich, but he is also generous."
        ]
      }
    ]
  },
  {
    "id": "8",
    "sentence": "The more you practice, the better you become.",
    "translation": "你练习得越多，就变得越好。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "the better you become",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "比较结构",
          "content": "The more you practice",
          "function": "表示条件或程度"
        }
      ],
      "words": [
        {
          "word": "The more",
          "partOfSpeech": "比较级结构",
          "function": "表示程度"
        },
        {
          "word": "the better",
          "partOfSpeech": "比较级结构",
          "function": "表示结果"
        },
        {
          "word": "become",
          "partOfSpeech": "动词",
          "function": "系动词，表示变化"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "正比关系",
        "description": "表示两个变量之间的正相关关系",
        "examples": [
          "The more you read, the more you learn.",
          "The harder you work, the more you earn.",
          "The earlier you start, the sooner you finish."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "The + 比较级 + 主语 + 谓语, the + 比较级 + 主语 + 谓语",
        "examples": [
          "The more you practice, the better you become.",
          "The faster you run, the sooner you arrive.",
          "The more money you save, the more secure you feel."
        ],
        "usage": "用于表达两个变量之间的正相关关系"
      }
    ],
    "grammarPoints": [
      {
        "point": "The more...the more结构",
        "explanation": "表示两个变量之间的正相关关系，前后都用比较级",
        "examples": [
          "The more you practice, the better you become.",
          "The more you study, the more you know.",
          "The more you give, the more you receive."
        ]
      }
    ]
  },
  {
    "id": "9",
    "sentence": "It is important that everyone should attend the meeting.",
    "translation": "重要的是每个人都应该参加会议。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "It is important",
      "subordinateClauses": [
        {
          "type": "主语从句",
          "content": "that everyone should attend the meeting",
          "function": "作为真正的主语，说明什么重要",
          "connector": "that"
        }
      ],
      "phrases": [
        {
          "type": "形容词短语",
          "content": "is important",
          "function": "作谓语，表示重要性"
        }
      ],
      "words": [
        {
          "word": "It",
          "partOfSpeech": "代词",
          "function": "形式主语"
        },
        {
          "word": "that",
          "partOfSpeech": "连词",
          "function": "引导主语从句"
        },
        {
          "word": "should",
          "partOfSpeech": "情态动词",
          "function": "表示建议或义务"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "重要性关系",
        "description": "强调某事的重要性",
        "examples": [
          "It is necessary that we finish on time.",
          "It is essential that you follow the rules.",
          "It is crucial that we make the right decision."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "It is + 形容词 + that + 从句",
        "examples": [
          "It is important that everyone should attend.",
          "It is necessary that we work together.",
          "It is essential that you arrive on time."
        ],
        "usage": "用于强调某事的重要性或必要性"
      }
    ],
    "grammarPoints": [
      {
        "point": "It is...that结构",
        "explanation": "使用it作为形式主语，真正的主语是that引导的从句",
        "examples": [
          "It is important that everyone should attend.",
          "It is necessary that we work hard.",
          "It is essential that you follow the instructions."
        ]
      }
    ]
  },
  {
    "id": "10",
    "sentence": "Having finished his homework, he went to bed.",
    "translation": "完成作业后，他去睡觉了。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "he went to bed",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "现在分词短语",
          "content": "Having finished his homework",
          "function": "作状语，表示时间或原因"
        }
      ],
      "words": [
        {
          "word": "Having",
          "partOfSpeech": "现在分词",
          "function": "引导分词短语"
        },
        {
          "word": "finished",
          "partOfSpeech": "过去分词",
          "function": "表示完成的动作"
        },
        {
          "word": "went",
          "partOfSpeech": "动词",
          "function": "主句谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "时间关系",
        "description": "表示一个动作完成后紧接着发生另一个动作",
        "examples": [
          "Having eaten dinner, we watched TV.",
          "Having completed the project, they celebrated.",
          "Having arrived home, she called her mother."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "Having + 过去分词 + 宾语, 主句",
        "examples": [
          "Having finished his homework, he went to bed.",
          "Having eaten breakfast, she left for work.",
          "Having completed the task, they went home."
        ],
        "usage": "用于表达一个动作完成后紧接着发生另一个动作"
      }
    ],
    "grammarPoints": [
      {
        "point": "现在分词短语作状语",
        "explanation": "用现在分词短语表示时间、原因或条件",
        "examples": [
          "Having finished his homework, he went to bed.",
          "Being tired, she went to bed early.",
          "Knowing the answer, he raised his hand."
        ]
      }
    ]
  },
  {
    "id": "11",
    "sentence": "The book was written by a famous author.",
    "translation": "这本书是由一位著名作家写的。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "The book was written by a famous author",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "被动语态",
          "content": "was written",
          "function": "表示被动动作"
        },
        {
          "type": "介词短语",
          "content": "by a famous author",
          "function": "表示动作的执行者"
        }
      ],
      "words": [
        {
          "word": "was",
          "partOfSpeech": "助动词",
          "function": "构成被动语态"
        },
        {
          "word": "written",
          "partOfSpeech": "过去分词",
          "function": "被动语态的谓语"
        },
        {
          "word": "by",
          "partOfSpeech": "介词",
          "function": "引出动作执行者"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "被动关系",
        "description": "表示动作的承受者",
        "examples": [
          "The letter was sent by John.",
          "The house was built by workers.",
          "The meal was cooked by my mother."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + be + 过去分词 + by + 执行者",
        "examples": [
          "The book was written by a famous author.",
          "The letter was sent by John.",
          "The house was built by workers."
        ],
        "usage": "用于表达被动语态，强调动作的承受者"
      }
    ],
    "grammarPoints": [
      {
        "point": "被动语态",
        "explanation": "表示主语是动作的承受者，由be动词+过去分词构成",
        "examples": [
          "The book was written by a famous author.",
          "The letter was sent by John.",
          "The house was built by workers."
        ]
      }
    ]
  },
  {
    "id": "12",
    "sentence": "If I were you, I would accept the offer.",
    "translation": "如果我是你，我会接受这个提议。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "I would accept the offer",
      "subordinateClauses": [
        {
          "type": "虚拟条件从句",
          "content": "If I were you",
          "function": "表示虚拟条件"
        }
      ],
      "phrases": [
        {
          "type": "虚拟语气",
          "content": "would accept",
          "function": "表示虚拟结果"
        }
      ],
      "words": [
        {
          "word": "were",
          "partOfSpeech": "动词",
          "function": "虚拟语气中的be动词"
        },
        {
          "word": "would",
          "partOfSpeech": "情态动词",
          "function": "表示虚拟结果"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "虚拟条件关系",
        "description": "表示假设的条件和可能的结果",
        "examples": [
          "If I had money, I would buy a car.",
          "If she were here, she would help us.",
          "If it were sunny, we would go to the beach."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "If + 主语 + were + 表语, 主语 + would + 动词原形",
        "examples": [
          "If I were you, I would accept the offer.",
          "If she were rich, she would travel the world.",
          "If he were younger, he would join the team."
        ],
        "usage": "用于表达虚拟条件句，表示假设的情况"
      }
    ],
    "grammarPoints": [
      {
        "point": "虚拟语气",
        "explanation": "表示假设、愿望或与事实相反的情况",
        "examples": [
          "If I were you, I would accept the offer.",
          "I wish I were taller.",
          "If only I had studied harder."
        ]
      }
    ]
  },
  {
    "id": "13",
    "sentence": "Sentence 13 demonstrates a complex grammatical structure.",
    "translation": "句子13展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 13 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 13",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "14",
    "sentence": "Sentence 14 demonstrates a complex grammatical structure.",
    "translation": "句子14展示了一个复杂的语法结构。",
    "difficulty": "青铜",
    "structure": {
      "mainClause": "Sentence 14 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 14",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "15",
    "sentence": "Sentence 15 demonstrates a complex grammatical structure.",
    "translation": "句子15展示了一个复杂的语法结构。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "Sentence 15 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 15",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "16",
    "sentence": "Sentence 16 demonstrates a complex grammatical structure.",
    "translation": "句子16展示了一个复杂的语法结构。",
    "difficulty": "钻石",
    "structure": {
      "mainClause": "Sentence 16 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 16",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "17",
    "sentence": "Sentence 17 demonstrates a complex grammatical structure.",
    "translation": "句子17展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 17 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 17",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "18",
    "sentence": "Sentence 18 demonstrates a complex grammatical structure.",
    "translation": "句子18展示了一个复杂的语法结构。",
    "difficulty": "钻石",
    "structure": {
      "mainClause": "Sentence 18 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 18",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "19",
    "sentence": "Sentence 19 demonstrates a complex grammatical structure.",
    "translation": "句子19展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 19 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 19",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "20",
    "sentence": "Sentence 20 demonstrates a complex grammatical structure.",
    "translation": "句子20展示了一个复杂的语法结构。",
    "difficulty": "钻石",
    "structure": {
      "mainClause": "Sentence 20 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 20",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "21",
    "sentence": "Sentence 21 demonstrates a complex grammatical structure.",
    "translation": "句子21展示了一个复杂的语法结构。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "Sentence 21 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 21",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "22",
    "sentence": "Sentence 22 demonstrates a complex grammatical structure.",
    "translation": "句子22展示了一个复杂的语法结构。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "Sentence 22 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 22",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "23",
    "sentence": "Sentence 23 demonstrates a complex grammatical structure.",
    "translation": "句子23展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 23 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 23",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "24",
    "sentence": "Sentence 24 demonstrates a complex grammatical structure.",
    "translation": "句子24展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 24 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 24",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "25",
    "sentence": "Sentence 25 demonstrates a complex grammatical structure.",
    "translation": "句子25展示了一个复杂的语法结构。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "Sentence 25 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 25",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "26",
    "sentence": "Sentence 26 demonstrates a complex grammatical structure.",
    "translation": "句子26展示了一个复杂的语法结构。",
    "difficulty": "青铜",
    "structure": {
      "mainClause": "Sentence 26 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 26",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "27",
    "sentence": "Sentence 27 demonstrates a complex grammatical structure.",
    "translation": "句子27展示了一个复杂的语法结构。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "Sentence 27 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 27",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "28",
    "sentence": "Sentence 28 demonstrates a complex grammatical structure.",
    "translation": "句子28展示了一个复杂的语法结构。",
    "difficulty": "钻石",
    "structure": {
      "mainClause": "Sentence 28 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 28",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "29",
    "sentence": "Sentence 29 demonstrates a complex grammatical structure.",
    "translation": "句子29展示了一个复杂的语法结构。",
    "difficulty": "钻石",
    "structure": {
      "mainClause": "Sentence 29 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 29",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "30",
    "sentence": "Sentence 30 demonstrates a complex grammatical structure.",
    "translation": "句子30展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 30 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 30",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "31",
    "sentence": "Sentence 31 demonstrates a complex grammatical structure.",
    "translation": "句子31展示了一个复杂的语法结构。",
    "difficulty": "钻石",
    "structure": {
      "mainClause": "Sentence 31 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 31",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "32",
    "sentence": "Sentence 32 demonstrates a complex grammatical structure.",
    "translation": "句子32展示了一个复杂的语法结构。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "Sentence 32 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 32",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "33",
    "sentence": "Sentence 33 demonstrates a complex grammatical structure.",
    "translation": "句子33展示了一个复杂的语法结构。",
    "difficulty": "钻石",
    "structure": {
      "mainClause": "Sentence 33 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 33",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "34",
    "sentence": "Sentence 34 demonstrates a complex grammatical structure.",
    "translation": "句子34展示了一个复杂的语法结构。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "Sentence 34 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 34",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "35",
    "sentence": "Sentence 35 demonstrates a complex grammatical structure.",
    "translation": "句子35展示了一个复杂的语法结构。",
    "difficulty": "钻石",
    "structure": {
      "mainClause": "Sentence 35 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 35",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "36",
    "sentence": "Sentence 36 demonstrates a complex grammatical structure.",
    "translation": "句子36展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 36 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 36",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "37",
    "sentence": "Sentence 37 demonstrates a complex grammatical structure.",
    "translation": "句子37展示了一个复杂的语法结构。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "Sentence 37 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 37",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "38",
    "sentence": "Sentence 38 demonstrates a complex grammatical structure.",
    "translation": "句子38展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 38 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 38",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "39",
    "sentence": "Sentence 39 demonstrates a complex grammatical structure.",
    "translation": "句子39展示了一个复杂的语法结构。",
    "difficulty": "青铜",
    "structure": {
      "mainClause": "Sentence 39 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 39",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "40",
    "sentence": "Sentence 40 demonstrates a complex grammatical structure.",
    "translation": "句子40展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 40 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 40",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "41",
    "sentence": "Sentence 41 demonstrates a complex grammatical structure.",
    "translation": "句子41展示了一个复杂的语法结构。",
    "difficulty": "青铜",
    "structure": {
      "mainClause": "Sentence 41 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 41",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "42",
    "sentence": "Sentence 42 demonstrates a complex grammatical structure.",
    "translation": "句子42展示了一个复杂的语法结构。",
    "difficulty": "青铜",
    "structure": {
      "mainClause": "Sentence 42 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 42",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "43",
    "sentence": "Sentence 43 demonstrates a complex grammatical structure.",
    "translation": "句子43展示了一个复杂的语法结构。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "Sentence 43 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 43",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "44",
    "sentence": "Sentence 44 demonstrates a complex grammatical structure.",
    "translation": "句子44展示了一个复杂的语法结构。",
    "difficulty": "青铜",
    "structure": {
      "mainClause": "Sentence 44 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 44",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "45",
    "sentence": "Sentence 45 demonstrates a complex grammatical structure.",
    "translation": "句子45展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 45 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 45",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "46",
    "sentence": "Sentence 46 demonstrates a complex grammatical structure.",
    "translation": "句子46展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 46 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 46",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "47",
    "sentence": "Sentence 47 demonstrates a complex grammatical structure.",
    "translation": "句子47展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 47 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 47",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "48",
    "sentence": "Sentence 48 demonstrates a complex grammatical structure.",
    "translation": "句子48展示了一个复杂的语法结构。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "Sentence 48 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 48",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "49",
    "sentence": "Sentence 49 demonstrates a complex grammatical structure.",
    "translation": "句子49展示了一个复杂的语法结构。",
    "difficulty": "青铜",
    "structure": {
      "mainClause": "Sentence 49 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 49",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "50",
    "sentence": "Sentence 50 demonstrates a complex grammatical structure.",
    "translation": "句子50展示了一个复杂的语法结构。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "Sentence 50 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 50",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "51",
    "sentence": "Sentence 51 demonstrates a complex grammatical structure.",
    "translation": "句子51展示了一个复杂的语法结构。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "Sentence 51 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 51",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "52",
    "sentence": "Sentence 52 demonstrates a complex grammatical structure.",
    "translation": "句子52展示了一个复杂的语法结构。",
    "difficulty": "青铜",
    "structure": {
      "mainClause": "Sentence 52 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 52",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "53",
    "sentence": "Sentence 53 demonstrates a complex grammatical structure.",
    "translation": "句子53展示了一个复杂的语法结构。",
    "difficulty": "青铜",
    "structure": {
      "mainClause": "Sentence 53 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 53",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "54",
    "sentence": "Sentence 54 demonstrates a complex grammatical structure.",
    "translation": "句子54展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 54 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 54",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "55",
    "sentence": "Sentence 55 demonstrates a complex grammatical structure.",
    "translation": "句子55展示了一个复杂的语法结构。",
    "difficulty": "钻石",
    "structure": {
      "mainClause": "Sentence 55 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 55",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "56",
    "sentence": "Sentence 56 demonstrates a complex grammatical structure.",
    "translation": "句子56展示了一个复杂的语法结构。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "Sentence 56 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 56",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "57",
    "sentence": "Sentence 57 demonstrates a complex grammatical structure.",
    "translation": "句子57展示了一个复杂的语法结构。",
    "difficulty": "青铜",
    "structure": {
      "mainClause": "Sentence 57 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 57",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "58",
    "sentence": "Sentence 58 demonstrates a complex grammatical structure.",
    "translation": "句子58展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 58 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 58",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "59",
    "sentence": "Sentence 59 demonstrates a complex grammatical structure.",
    "translation": "句子59展示了一个复杂的语法结构。",
    "difficulty": "钻石",
    "structure": {
      "mainClause": "Sentence 59 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 59",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "60",
    "sentence": "Sentence 60 demonstrates a complex grammatical structure.",
    "translation": "句子60展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 60 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 60",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "61",
    "sentence": "Sentence 61 demonstrates a complex grammatical structure.",
    "translation": "句子61展示了一个复杂的语法结构。",
    "difficulty": "钻石",
    "structure": {
      "mainClause": "Sentence 61 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 61",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "62",
    "sentence": "Sentence 62 demonstrates a complex grammatical structure.",
    "translation": "句子62展示了一个复杂的语法结构。",
    "difficulty": "钻石",
    "structure": {
      "mainClause": "Sentence 62 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 62",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "63",
    "sentence": "Sentence 63 demonstrates a complex grammatical structure.",
    "translation": "句子63展示了一个复杂的语法结构。",
    "difficulty": "青铜",
    "structure": {
      "mainClause": "Sentence 63 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 63",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "64",
    "sentence": "Sentence 64 demonstrates a complex grammatical structure.",
    "translation": "句子64展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 64 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 64",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "65",
    "sentence": "Sentence 65 demonstrates a complex grammatical structure.",
    "translation": "句子65展示了一个复杂的语法结构。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "Sentence 65 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 65",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "66",
    "sentence": "Sentence 66 demonstrates a complex grammatical structure.",
    "translation": "句子66展示了一个复杂的语法结构。",
    "difficulty": "钻石",
    "structure": {
      "mainClause": "Sentence 66 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 66",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "67",
    "sentence": "Sentence 67 demonstrates a complex grammatical structure.",
    "translation": "句子67展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 67 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 67",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "68",
    "sentence": "Sentence 68 demonstrates a complex grammatical structure.",
    "translation": "句子68展示了一个复杂的语法结构。",
    "difficulty": "钻石",
    "structure": {
      "mainClause": "Sentence 68 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 68",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "69",
    "sentence": "Sentence 69 demonstrates a complex grammatical structure.",
    "translation": "句子69展示了一个复杂的语法结构。",
    "difficulty": "钻石",
    "structure": {
      "mainClause": "Sentence 69 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 69",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "70",
    "sentence": "Sentence 70 demonstrates a complex grammatical structure.",
    "translation": "句子70展示了一个复杂的语法结构。",
    "difficulty": "钻石",
    "structure": {
      "mainClause": "Sentence 70 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 70",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "71",
    "sentence": "Sentence 71 demonstrates a complex grammatical structure.",
    "translation": "句子71展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 71 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 71",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "72",
    "sentence": "Sentence 72 demonstrates a complex grammatical structure.",
    "translation": "句子72展示了一个复杂的语法结构。",
    "difficulty": "青铜",
    "structure": {
      "mainClause": "Sentence 72 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 72",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "73",
    "sentence": "Sentence 73 demonstrates a complex grammatical structure.",
    "translation": "句子73展示了一个复杂的语法结构。",
    "difficulty": "青铜",
    "structure": {
      "mainClause": "Sentence 73 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 73",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "74",
    "sentence": "Sentence 74 demonstrates a complex grammatical structure.",
    "translation": "句子74展示了一个复杂的语法结构。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "Sentence 74 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 74",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "75",
    "sentence": "Sentence 75 demonstrates a complex grammatical structure.",
    "translation": "句子75展示了一个复杂的语法结构。",
    "difficulty": "青铜",
    "structure": {
      "mainClause": "Sentence 75 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 75",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "76",
    "sentence": "Sentence 76 demonstrates a complex grammatical structure.",
    "translation": "句子76展示了一个复杂的语法结构。",
    "difficulty": "青铜",
    "structure": {
      "mainClause": "Sentence 76 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 76",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "77",
    "sentence": "Sentence 77 demonstrates a complex grammatical structure.",
    "translation": "句子77展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 77 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 77",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "78",
    "sentence": "Sentence 78 demonstrates a complex grammatical structure.",
    "translation": "句子78展示了一个复杂的语法结构。",
    "difficulty": "青铜",
    "structure": {
      "mainClause": "Sentence 78 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 78",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "79",
    "sentence": "Sentence 79 demonstrates a complex grammatical structure.",
    "translation": "句子79展示了一个复杂的语法结构。",
    "difficulty": "钻石",
    "structure": {
      "mainClause": "Sentence 79 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 79",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "80",
    "sentence": "Sentence 80 demonstrates a complex grammatical structure.",
    "translation": "句子80展示了一个复杂的语法结构。",
    "difficulty": "钻石",
    "structure": {
      "mainClause": "Sentence 80 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 80",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "81",
    "sentence": "Sentence 81 demonstrates a complex grammatical structure.",
    "translation": "句子81展示了一个复杂的语法结构。",
    "difficulty": "青铜",
    "structure": {
      "mainClause": "Sentence 81 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 81",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "82",
    "sentence": "Sentence 82 demonstrates a complex grammatical structure.",
    "translation": "句子82展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 82 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 82",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "83",
    "sentence": "Sentence 83 demonstrates a complex grammatical structure.",
    "translation": "句子83展示了一个复杂的语法结构。",
    "difficulty": "青铜",
    "structure": {
      "mainClause": "Sentence 83 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 83",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "84",
    "sentence": "Sentence 84 demonstrates a complex grammatical structure.",
    "translation": "句子84展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 84 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 84",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "85",
    "sentence": "Sentence 85 demonstrates a complex grammatical structure.",
    "translation": "句子85展示了一个复杂的语法结构。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "Sentence 85 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 85",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "86",
    "sentence": "Sentence 86 demonstrates a complex grammatical structure.",
    "translation": "句子86展示了一个复杂的语法结构。",
    "difficulty": "青铜",
    "structure": {
      "mainClause": "Sentence 86 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 86",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "87",
    "sentence": "Sentence 87 demonstrates a complex grammatical structure.",
    "translation": "句子87展示了一个复杂的语法结构。",
    "difficulty": "钻石",
    "structure": {
      "mainClause": "Sentence 87 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 87",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "88",
    "sentence": "Sentence 88 demonstrates a complex grammatical structure.",
    "translation": "句子88展示了一个复杂的语法结构。",
    "difficulty": "钻石",
    "structure": {
      "mainClause": "Sentence 88 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 88",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "89",
    "sentence": "Sentence 89 demonstrates a complex grammatical structure.",
    "translation": "句子89展示了一个复杂的语法结构。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "Sentence 89 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 89",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "90",
    "sentence": "Sentence 90 demonstrates a complex grammatical structure.",
    "translation": "句子90展示了一个复杂的语法结构。",
    "difficulty": "钻石",
    "structure": {
      "mainClause": "Sentence 90 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 90",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "91",
    "sentence": "Sentence 91 demonstrates a complex grammatical structure.",
    "translation": "句子91展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 91 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 91",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "92",
    "sentence": "Sentence 92 demonstrates a complex grammatical structure.",
    "translation": "句子92展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 92 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 92",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "93",
    "sentence": "Sentence 93 demonstrates a complex grammatical structure.",
    "translation": "句子93展示了一个复杂的语法结构。",
    "difficulty": "黄金",
    "structure": {
      "mainClause": "Sentence 93 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 93",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "94",
    "sentence": "Sentence 94 demonstrates a complex grammatical structure.",
    "translation": "句子94展示了一个复杂的语法结构。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "Sentence 94 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 94",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "95",
    "sentence": "Sentence 95 demonstrates a complex grammatical structure.",
    "translation": "句子95展示了一个复杂的语法结构。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "Sentence 95 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 95",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "96",
    "sentence": "Sentence 96 demonstrates a complex grammatical structure.",
    "translation": "句子96展示了一个复杂的语法结构。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "Sentence 96 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 96",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "97",
    "sentence": "Sentence 97 demonstrates a complex grammatical structure.",
    "translation": "句子97展示了一个复杂的语法结构。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "Sentence 97 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 97",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "98",
    "sentence": "Sentence 98 demonstrates a complex grammatical structure.",
    "translation": "句子98展示了一个复杂的语法结构。",
    "difficulty": "青铜",
    "structure": {
      "mainClause": "Sentence 98 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 98",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "99",
    "sentence": "Sentence 99 demonstrates a complex grammatical structure.",
    "translation": "句子99展示了一个复杂的语法结构。",
    "difficulty": "白银",
    "structure": {
      "mainClause": "Sentence 99 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 99",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  },
  {
    "id": "100",
    "sentence": "Sentence 100 demonstrates a complex grammatical structure.",
    "translation": "句子100展示了一个复杂的语法结构。",
    "difficulty": "青铜",
    "structure": {
      "mainClause": "Sentence 100 demonstrates a complex grammatical structure",
      "subordinateClauses": [],
      "phrases": [
        {
          "type": "名词短语",
          "content": "Sentence 100",
          "function": "作主语"
        }
      ],
      "words": [
        {
          "word": "Sentence",
          "partOfSpeech": "名词",
          "function": "主语"
        },
        {
          "word": "demonstrates",
          "partOfSpeech": "动词",
          "function": "谓语动词"
        }
      ]
    },
    "logicRelations": [
      {
        "type": "陈述关系",
        "description": "陈述一个事实",
        "examples": [
          "This is a good example.",
          "That is an interesting point.",
          "It is a complex structure."
        ]
      }
    ],
    "similarPatterns": [
      {
        "pattern": "主语 + demonstrates + 宾语",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ],
        "usage": "用于陈述事实或描述状态"
      }
    ],
    "grammarPoints": [
      {
        "point": "主谓宾结构",
        "explanation": "由主语、谓语动词和宾语构成的基本句型",
        "examples": [
          "This demonstrates the principle.",
          "That shows the concept.",
          "It illustrates the point."
        ]
      }
    ]
  }
];

export default analysisSentences;
