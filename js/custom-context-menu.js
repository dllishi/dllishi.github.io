// 自定义右键菜单功能
document.addEventListener('DOMContentLoaded', function() {
    // 创建菜单元素
    const menu = document.createElement('div');
    menu.id = 'custom-context-menu';
    menu.innerHTML = `
        <div class="menu-item" data-action="back"><i class="fas fa-arrow-left"></i> 返回</div>
        <div class="menu-item" data-action="forward"><i class="fas fa-arrow-right"></i> 前进</div>
        <div class="menu-item" data-action="reload"><i class="fas fa-redo"></i> 刷新</div>
        <hr>
        <div class="menu-item" data-action="copy"><i class="fas fa-copy"></i> 复制</div>
        <div class="menu-item" data-action="paste"><i class="fas fa-paste"></i> 粘贴</div>
        <hr>
        <div class="menu-item" data-action="search"><i class="fas fa-search"></i> 搜索</div>
        <div class="menu-item" data-action="view-source"><i class="fas fa-code"></i> 查看源码</div>
    `;
    document.body.appendChild(menu);
    
    // 菜单项功能
    const actions = {
        back: () => history.back(),
        forward: () => history.forward(),
        reload: () => location.reload(),
        copy: () => document.execCommand('copy'),
        paste: () => document.execCommand('paste'),
        search: () => {
            const query = window.getSelection().toString();
            if (query) {
                window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
            } else {
                window.open('https://www.google.com/');
            }
        },
        'view-source': () => window.open('view-source:' + location.href)
    };
    
    // 监听右键点击事件
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        
        // 隐藏菜单（如果已显示）
        menu.style.display = 'none';
        
        // 显示菜单在新位置
        menu.style.display = 'block';
        
        // 定位菜单（防止超出屏幕边界）
        const x = Math.min(e.pageX, window.innerWidth - menu.offsetWidth - 10);
        const y = Math.min(e.pageY, window.innerHeight - menu.offsetHeight - 10);
        
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';
    });
    
    // 点击菜单项
    menu.addEventListener('click', function(e) {
        if (e.target.classList.contains('menu-item')) {
            const action = e.target.dataset.action;
            if (actions[action]) {
                actions[action]();
                menu.style.display = 'none';
            }
        }
    });
    
    // 点击其他地方隐藏菜单
    document.addEventListener('click', function() {
        menu.style.display = 'none';
    });
    
    // 按ESC键隐藏菜单
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            menu.style.display = 'none';
        }
    });
});