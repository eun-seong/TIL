---
title: '시계열 데이터 변수 추출'
path: 'time_series01_data_feature_engineering'
date: '2021-03-09 20:59:49'
template: 'post'
category: 'DataAnalysis'
---

## 대표적인 시계열 변수추출 방향 7가지(feature engineering)
1. 빈도(Frequency) : 계절성 패턴(Seasonality)이 나타나기 전까지 데이터 개수로 사람이 정해야 함
    ```python
    # freq를 변경해줌, H : hour
    # ffil : NaN일 경우 앞의 데이터로 채움
    raw_all.asfreq('H', method='ffil')
    ```

    * frequency를 변경할 경우 비어있는 값들은 알아서 row를 생성한 후 NaN으로 채움 => `ffill`, `bfill` 등으로 데이터 채움
2. 추세(Trend) : 시계열이 시간에 따라 증가, 감소 또는 일정 수준을 유지하는 경우
3. 계절성(Seasonality) : 일정한 빈도로 주기적으로 반복되는 패턴, 특정한 달/요일에 따라 기대값이 달라지는 것
4. 주기(Cycle) : 일정하지 않은 빈도로 발생하는 패턴(계절성)
5. 시계열 분해(추세/계절성/잔차(residual))
    ```python
    # sm : statsmodels.api
    # additive로 시계열 분해 : 추세 + 계절성 + 잔차
    # multiplicative도 있음 : 추세 * 계절성 * 잔차
    sm.tas.seasonal_decompose(raw_all['count'], model='additive').plot()
    ```
6. 더미 변수(dummy variable) : 이진수의 형태로 변수를 생성하는 것
    * 범주형 변수의 기준값을 미리 결정
7. 지연값 : 변수의 시간을 조금씩 뒤로 미뤄 해당 발생 시각이 아닌 그 전 날, 전전 날 등으로 변수를 사용
8. 시간변수 : 시간변수를 미시/거시적으로 분리/통합하여 생성된 변수
    ```python
    # 데이터를 앞뒤 24개로 묶어서 평균
    raw_all[['count']].rolling(24).mean()   # daily pattern
    raw_all[['count']].rolling(24*7).mean()   # weekly pattern
    ```


* `diff()`

    ```python
    raw_all[['count']].diff()
    ```

    * 앞 데이터와 차이

