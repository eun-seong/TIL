---
title: HTTP Vary Headr 이해하기
tags: http
category: translation
---



원본 글 : https://www.smashingmagazine.com/2017/11/understanding-vary-header/


* * *



`vari` HTTP 헤더는 매일 수십억 개의 HTTP 응답으로 전송됩니다. 하지만 `vary`의 사용은 원래 비전을 결코 충족시키지 못했습니다. 많은 개발자들은 이 헤더가 어떤 일을 하는지 오해하거나 심지어 자신의 웹 서버가 이 헤더를 보내고 있다는 사실 조차 모르고 있습니다. Client Hints, Variants 및 주요 사양이 발표되면서 다양한 반응이 새롭게 시작되고 있습니다.

## `Vary`가 뭘까요?
`Vary`의 이야기는 "웹이 어떻게 작동해야 하는지"에 대한 아름다운 생각으로 시작합니다. 원칙적으로 URL은 웹 페이지가 아니라, 은행 명세서와 같은 개념적 자원을 나타냅니다. 
예를 들어 제가 은행 명세서를 보고 싶다고 가정해볼게요. `bank.com`으로 이동하여 `/statement`에 대한 GET 요청을 전송합니다. 지금까지는 좋았지만, 저는 어떤 형식으로 받고 싶은지 말하지 않았습니다. 이것이 브라우저가 요청에 `Accept: text/html`과 같은 항목도 포함하는 이유입니다. 이론적으로 적어도 이는 대신 Accept: text/csv라고 말하고 동일한 리소스를 다른 형식으로 가져올 수 있음을 의미합니다.






