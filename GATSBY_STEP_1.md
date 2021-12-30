# Create a blog with gatsby. Step 1.

## Gatsby Project를 생성하고, 로컬서버로 구동하기

블로그를 만들게 된 간략한 이유.
프로젝트관련된 것이 아닌 기술적 개념적인 지식정리.. 등

gatsby의 개념적인 내용.


Gatsby 설치
```
npm install -g gatsby-cli
```

Gatsby Project 생성

```
gatsby new [PROJECT_NAME] [THEME_URL]
```

```
gatsby new gatsby-bosung-blog https://github.com/gatsbyjs/gatsby-starter-blog
```

참고 : https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog


Gatsby Project 로컬 서버 구동

`gatsby new` 명령어로 새로운 gatsby 프로젝트 생성에 성공했다면, 아래의 명령어를 통해 프로젝트 디렉토리에 접근하여 개발서버를 구동할 수 있다.


```
cd gatsby-bosung-blog //프로젝트 디렉토리에 접속
gatsby develop //로컬서버 구동
```
간혹, 공식 gatsby starter 플러그인이 아니거나, 잘못된 플러그인일 경우 이 단계에서 서버구동이 정상적으로 되지 않는다. 다양한 원인과 케이스가 있겠지만, 필자는 node_modules 폴더를 삭제하고 `npm install` 명령어를 통해 재설치하여 문제를 해결한 경험이 있다.

로컬 서버 구동에 성공했다면, 아래와 같은 메시지를 받게 된다.



```
You can now view gatsby-starter-blog in the browser.
⠀
  http://localhost:8000/
⠀
View GraphiQL, an in-browser IDE, to explore your site's data and schema
⠀
  http://localhost:8000/___graphql
```



localhost 접속

![image](https://user-images.githubusercontent.com/34260967/147789753-a93ebee4-f89e-41dd-8d4e-9ae99a1ce775.png)

localhost:8000/__graphql 접속
![image](https://user-images.githubusercontent.com/34260967/147790319-a44e7b6b-ef24-425c-a321-2a88f246817a.png)
