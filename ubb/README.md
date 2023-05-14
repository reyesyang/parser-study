UUB parser sample

非终结符的文法定义
```
<UUB> -> <TAG> <UUB>
       | TEXT <UUB>
       | ε
       | $


<TAG> -> BEGIN_TAG <UUB> END_TAG
```


终结符的正则表达式
```
BEGIN_TAG -> [\w+]
END_TAG -> [/\w+]
TEXT -> [^\[\]]*
```
