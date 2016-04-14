/**
 * Created by Administrator on 2016/4/14.
 */
var aqiData = {},
    aqiTable = document.getElementById('aqi-table'),
    aqiCity = document.getElementById('aqi-city-input'),
    aqiValue = document.getElementById('aqi-value-input'),
    addBtn = document.getElementById('add-btn');

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData(city, value) {
    aqiData[aqiCity.value] = aqiValue.value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var firstStr = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
    var secondStr = '';
    for (var city in aqiData) {
        secondStr += '<tr><td>'+city+'</td><td>'+aqiData[city]+'</td><td><button city='+city+'>删除</button></td></tr>'
    };
    aqiTable.innerHTML = firstStr + secondStr;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    // do sth.
    delete aqiData[city];
    renderAqiList();
}

function init() {
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    addBtn.addEventListener('click', addBtnHandle, false);

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    aqiTable.addEventListener('click', function (event) {
        if (event.target.nodeName.toLowerCase() == 'button') {
            delBtnHandle(event.target.getAttribute('City'));
        }
    }, false);

    // 城市输入框失去焦点时
    aqiCity.addEventListener('blur', function (event) {
        if (!event.target.value.trim().match(/^[A-Za-z\u4E00-\u9FA5\uF900-\uFA2D]+$/)) {
            alert("城市名必须为中英文字符！");
            return;
        };
    }, false);

    // 空气质量输入框失去焦点时
    aqiValue.addEventListener('blur', function (event) {
        if (!event.target.value.trim().match(/^\d+$/)) {
            alert("空气质量指数必须为整数！");
            return;
        };
    }, false);
}

init();
