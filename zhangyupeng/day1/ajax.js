function ajax(opt) {
    // Ĭ��
    var def = {
        type: 'get', // Ĭ�ϵ�����ʽ
        url: null,
        data: null, // ��������
        async: true, // �첽
        success: null,
        error: null
    };
    // �ϲ�����չ������
    var settings = extend({}, def, opt);
    if (Object.prototype.toString.call(settings.data) === '[object Object]') {
        // ������תΪ�ַ���
        var obj = settings.data;
        var str = '';
        for (var k in obj) {
            str += k + '=' + obj[k] + '&';
        }
        settings.data = str.slice(0, -1);
    };
    // ��һ������XMLHttpRequest    
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    // ��Ҫ�����������ݲ���������get��ʽ����
    var getData = '';
    if (settings.data && settings.type === 'get') {
        getData = '?' + encodeURI(settings.data);
    }
    // ��������
    xhr.open(settings.type, settings.url + getData, settings.async);
    // ������Ӧ����
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) { //�������Ƿ���ɲ��ɹ���
            // ������Ӧ���� xhr.responseText:                
            settings.success(xhr.responseText);
        };
    };
    var postData = null;
    // ��Ҫ�����������ݲ���������post��ʽ����
    if (settings.data && settings.type === 'post') {
        postData = encodeURI(settings.data);
    }
    // ��������ͷ,����ŵ�send����ǰ
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    // ��������
    xhr.send(postData);
};
// �ϲ�������
function extend() {
    var arg = arguments;
    for (var i = 1; i < arg.length; i++) {
        for (var k in arg[i]) {
            arg[0][k] = arg[i][k];
        }
    }
    return arg[0];
}