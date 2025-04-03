// 全局变量 - 播放状态
let isPlaying = false;
let currentVolume = 0.8;
let currentProgress = 30; // 当前播放进度百分比
let audioTimer = null; // 模拟音频播放的计时器

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 初始化时间显示
  updateStatusBarTime();
  
  // 每分钟更新一次时间
  setInterval(updateStatusBarTime, 60000);
  
  // 初始化播放器状态
  initPlayer();
  
  // 初始化页面特定功能
  initPageSpecificFeatures();
  
  // 添加全局事件监听
  addGlobalEventListeners();
});

// 更新状态栏时间
function updateStatusBarTime() {
  const timeElements = document.querySelectorAll('.status-bar__time');
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const timeStr = `${hours}:${minutes}`;
  
  timeElements.forEach(el => {
    el.textContent = timeStr;
  });
}

// 初始化播放器
function initPlayer() {
  const playButtons = document.querySelectorAll('.player__controls .fa-play, .player__controls .fa-pause');
  
  playButtons.forEach(button => {
    button.addEventListener('click', togglePlayPause);
  });
  
  // 初始化进度条（如果在播放页面）
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    updateProgressBar(currentProgress);
    
    // 允许用户点击进度条改变进度
    progressBar.addEventListener('click', function(e) {
      const progressWidth = this.offsetWidth;
      const clickPosition = e.offsetX;
      const newProgress = (clickPosition / progressWidth) * 100;
      currentProgress = newProgress;
      updateProgressBar(newProgress);
    });
  }
  
  // 如果在播放页面，初始化播放控制按钮
  initPlayingControls();
}

// 切换播放/暂停状态
function togglePlayPause() {
  const playerPlayButtons = document.querySelectorAll('.player__controls .fa-play, .player__controls .fa-pause');
  const playingPagePlayButton = document.querySelector('.control-btn.large i');
  
  isPlaying = !isPlaying;
  
  // 更新播放器按钮
  playerPlayButtons.forEach(button => {
    if (isPlaying) {
      button.classList.remove('fa-play');
      button.classList.add('fa-pause');
    } else {
      button.classList.remove('fa-pause');
      button.classList.add('fa-play');
    }
  });
  
  // 更新播放页面按钮（如果存在）
  if (playingPagePlayButton) {
    if (isPlaying) {
      playingPagePlayButton.classList.remove('fa-play');
      playingPagePlayButton.classList.add('fa-pause');
      
      // 模拟播放进度
      if (!audioTimer) {
        audioTimer = setInterval(function() {
          currentProgress += 0.5;
          if (currentProgress >= 100) {
            currentProgress = 0;
            togglePlayPause(); // 播放结束，自动暂停
            clearInterval(audioTimer);
            audioTimer = null;
          }
          updateProgressBar(currentProgress);
        }, 1000);
      }
    } else {
      playingPagePlayButton.classList.remove('fa-pause');
      playingPagePlayButton.classList.add('fa-play');
      
      // 暂停进度模拟
      if (audioTimer) {
        clearInterval(audioTimer);
        audioTimer = null;
      }
    }
  }
}

// 更新进度条
function updateProgressBar(percentage) {
  const progressBars = document.querySelectorAll('.progress-bar__filled');
  progressBars.forEach(bar => {
    bar.style.width = `${percentage}%`;
  });
  
  // 更新时间显示
  const progressTimes = document.querySelectorAll('.progress-time');
  progressTimes.forEach(timeContainer => {
    const timeElements = timeContainer.querySelectorAll('span');
    if (timeElements.length >= 2) {
      // 假设总长度为42:07
      const totalSeconds = 42 * 60 + 7;
      const currentSeconds = Math.floor(totalSeconds * (percentage / 100));
      
      const currentMinutes = Math.floor(currentSeconds / 60);
      const currentSecondsRemainder = currentSeconds % 60;
      
      timeElements[0].textContent = `${currentMinutes}:${currentSecondsRemainder.toString().padStart(2, '0')}`;
    }
  });
}

// 初始化播放页面控制按钮
function initPlayingControls() {
  const controlButtons = document.querySelectorAll('.playing-controls .control-btn');
  if (controlButtons.length === 0) return;
  
  // 播放/暂停按钮
  const playPauseButton = document.querySelector('.control-btn.large');
  if (playPauseButton) {
    playPauseButton.addEventListener('click', togglePlayPause);
  }
  
  // 前进15秒
  const forwardButton = document.querySelector('.control-btn .fa-forward').parentElement;
  if (forwardButton) {
    forwardButton.addEventListener('click', function() {
      currentProgress += 5.9; // 约15秒，假设总长42:07
      if (currentProgress > 100) currentProgress = 100;
      updateProgressBar(currentProgress);
    });
  }
  
  // 后退15秒
  const backwardButton = document.querySelector('.control-btn .fa-backward').parentElement;
  if (backwardButton) {
    backwardButton.addEventListener('click', function() {
      currentProgress -= 5.9; // 约15秒，假设总长42:07
      if (currentProgress < 0) currentProgress = 0;
      updateProgressBar(currentProgress);
    });
  }
  
  // 下一集
  const nextButton = document.querySelector('.control-btn .fa-step-forward').parentElement;
  if (nextButton) {
    nextButton.addEventListener('click', function() {
      showToast('已切换到下一集');
      currentProgress = 0;
      updateProgressBar(currentProgress);
    });
  }
  
  // 上一集
  const prevButton = document.querySelector('.control-btn .fa-step-backward').parentElement;
  if (prevButton) {
    prevButton.addEventListener('click', function() {
      showToast('已切换到上一集');
      currentProgress = 0;
      updateProgressBar(currentProgress);
    });
  }
  
  // 底部操作按钮
  const actionButtons = document.querySelectorAll('.playing-action');
  if (actionButtons.length > 0) {
    actionButtons.forEach(button => {
      button.addEventListener('click', function() {
        const actionName = this.querySelector('span').textContent;
        showToast(`${actionName}操作已执行`);
      });
    });
  }
}

// 初始化页面特定功能
function initPageSpecificFeatures() {
  // 获取当前页面名称
  const currentPage = window.location.pathname.split('/').pop();
  
  // 首页特定功能
  if (currentPage === 'home.html' || currentPage === '' || currentPage === 'index.html') {
    initHomePage();
  }
  
  // 播客详情页
  else if (currentPage === 'podcast-detail.html') {
    initPodcastDetailPage();
  }
  
  // 探索页
  else if (currentPage === 'explore.html') {
    initExplorePage();
  }
  
  // 用户页
  else if (currentPage === 'profile.html') {
    initProfilePage();
  }
  
  // 设置页
  else if (currentPage === 'settings.html') {
    initSettingsPage();
  }
}

// 首页初始化
function initHomePage() {
  // 点击播客卡片跳转到详情页
  const podcastCards = document.querySelectorAll('.podcast-card');
  podcastCards.forEach(card => {
    card.addEventListener('click', function() {
      window.location.href = 'podcast-detail.html';
    });
  });
}

// 播客详情页初始化
function initPodcastDetailPage() {
  // 标签切换
  const tabs = document.querySelectorAll('.podcast-detail__tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      const tabName = this.textContent;
      showToast(`切换到${tabName}标签`);
    });
  });
  
  // 播放最新按钮
  const playLatestButton = document.querySelector('.btn-primary');
  if (playLatestButton) {
    playLatestButton.addEventListener('click', function() {
      window.location.href = 'playing.html';
    });
  }
  
  // 订阅按钮
  const subscribeButton = document.querySelector('.btn-outline');
  if (subscribeButton) {
    subscribeButton.addEventListener('click', function() {
      this.classList.toggle('subscribed');
      
      if (this.classList.contains('subscribed')) {
        this.querySelector('i').classList.remove('fa-rss');
        this.querySelector('i').classList.add('fa-check');
        this.querySelector('span').textContent = '已订阅';
        this.style.backgroundColor = 'var(--primary-color)';
        this.style.color = 'white';
        this.style.borderColor = 'var(--primary-color)';
        showToast('订阅成功');
      } else {
        this.querySelector('i').classList.remove('fa-check');
        this.querySelector('i').classList.add('fa-rss');
        this.querySelector('span').textContent = '订阅';
        this.style.backgroundColor = '';
        this.style.color = '';
        this.style.borderColor = '';
        showToast('已取消订阅');
      }
    });
  }
  
  // 点击剧集项目
  const episodeItems = document.querySelectorAll('.episode-item');
  episodeItems.forEach(item => {
    item.addEventListener('click', function() {
      window.location.href = 'playing.html';
    });
  });
}

// 探索页初始化
function initExplorePage() {
  // 搜索输入
  const searchInput = document.querySelector('.search-input input');
  if (searchInput) {
    searchInput.addEventListener('focus', function() {
      this.placeholder = '';
    });
    
    searchInput.addEventListener('blur', function() {
      this.placeholder = '搜索播客、主题或创作者';
    });
    
    searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        showToast(`搜索: ${this.value}`);
        this.blur();
      }
    });
  }
  
  // 分类点击
  const categoryItems = document.querySelectorAll('.category-item');
  categoryItems.forEach(item => {
    item.addEventListener('click', function() {
      const categoryName = this.textContent;
      showToast(`查看分类: ${categoryName}`);
    });
  });
  
  // 播客卡片点击
  const podcastCards = document.querySelectorAll('.podcast-card');
  podcastCards.forEach(card => {
    card.addEventListener('click', function() {
      window.location.href = 'podcast-detail.html';
    });
  });
}

// 用户页初始化
function initProfilePage() {
  // 标签切换
  const tabs = document.querySelectorAll('.profile-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      const tabName = this.textContent;
      showToast(`切换到${tabName}标签`);
    });
  });
  
  // 播客卡片点击
  const podcastCards = document.querySelectorAll('.podcast-card');
  podcastCards.forEach(card => {
    card.addEventListener('click', function() {
      window.location.href = 'podcast-detail.html';
    });
  });
}

// 设置页初始化
function initSettingsPage() {
  // 设置项点击
  const settingsItems = document.querySelectorAll('.settings-item');
  settingsItems.forEach(item => {
    item.addEventListener('click', function() {
      const settingTitle = this.querySelector('.settings-item__title').textContent;
      showToast(`调整${settingTitle}设置`);
    });
  });
}

// 添加全局事件监听
function addGlobalEventListeners() {
  // 导航栏点击
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      // 对于链接不阻止默认行为
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
        showToast('功能开发中...');
      }
    });
  });
  
  // 全局播放器点击
  const miniPlayer = document.querySelector('.player');
  if (miniPlayer) {
    miniPlayer.addEventListener('click', function(e) {
      // 不要触发子元素中的点击事件
      if (e.target === this || e.target.classList.contains('player__info') || e.target.classList.contains('player__title') || e.target.classList.contains('player__creator') || e.target.classList.contains('player__cover')) {
        window.location.href = 'playing.html';
      }
    });
  }
}

// 显示提示消息
function showToast(message, duration = 2000) {
  // 创建toast元素
  let toast = document.querySelector('.toast');
  
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
    
    // 添加样式
    toast.style.position = 'fixed';
    toast.style.bottom = '140px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '20px';
    toast.style.fontSize = '14px';
    toast.style.zIndex = '1000';
    toast.style.transition = 'opacity 0.3s';
  }
  
  // 设置消息并显示
  toast.textContent = message;
  toast.style.opacity = '1';
  
  // 定时隐藏
  setTimeout(() => {
    toast.style.opacity = '0';
  }, duration);
} 