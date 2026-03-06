(function () {
  var bookKey = window.__THEME_BOOK_KEY__;
  var books = window.__THEME_BOOKS__ || {};
  var book = books[bookKey] || window.__THEME_BOOK__;
  if (!book) return;
  var params = new URLSearchParams(window.location.search);
  var returnTo = params.get('return_to');

  var state = { index: 0 };
  var els = {
    back: document.getElementById('back-link'),
    subject: document.getElementById('subject'),
    title: document.getElementById('title'),
    summary: document.getElementById('summary'),
    pageIndex: document.getElementById('page-index'),
    pageTitle: document.getElementById('page-title'),
    pageBody: document.getElementById('page-body'),
    pageTip: document.getElementById('page-tip'),
    scene: document.getElementById('scene'),
    sceneLabel: document.getElementById('scene-label'),
    sceneCaption: document.getElementById('scene-caption'),
    dots: document.getElementById('story-dots'),
    prev: document.getElementById('prev-page'),
    next: document.getElementById('next-page'),
    speak: document.getElementById('speak-page'),
    narration: document.getElementById('narration-status'),
    taskGrid: document.getElementById('task-grid'),
    taskHint: document.getElementById('task-hint'),
  };

  var preferredVoices = ['Xiaoxiao', 'Yunxi', 'Xiaochen', 'xiaoyi', 'Tingting', 'Mei-Jia', 'Sin-ji'];

  var clampIndex = function (value) {
    return Math.max(0, Math.min(book.pages.length - 1, value));
  };

  var goBack = function () {
    if (returnTo) {
      window.location.href = returnTo;
      return;
    }
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.href = '../';
  };

  var stopSpeech = function () {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (els.narration) {
      els.narration.textContent = '旁白已停止';
    }
  };

  var pickVoice = function () {
    if (!('speechSynthesis' in window)) return null;
    var voices = window.speechSynthesis.getVoices();
    if (!voices || !voices.length) return null;

    for (var i = 0; i < preferredVoices.length; i += 1) {
      var match = voices.find(function (voice) {
        return voice.lang.indexOf('zh') === 0 && voice.name.toLowerCase().indexOf(preferredVoices[i].toLowerCase()) >= 0;
      });
      if (match) return match;
    }

    return (
      voices.find(function (voice) {
        return voice.lang.indexOf('zh') === 0;
      }) || null
    );
  };

  var speak = function () {
    var page = book.pages[state.index];
    stopSpeech();
    if (!('speechSynthesis' in window)) {
      if (els.narration) {
        els.narration.textContent = '当前浏览器不支持语音朗读';
      }
      return;
    }

    var voice = pickVoice();
    var narrationText = page.audioText || [].concat(page.body || []).join(' ');
    var utterance = new SpeechSynthesisUtterance(narrationText);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.88;
    utterance.pitch = 1.03;
    utterance.volume = 1;
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = function () {
      if (els.narration) {
        els.narration.textContent = voice ? '正在播放旁白：' + voice.name : '正在播放旁白';
      }
    };
    utterance.onend = function () {
      if (els.narration) {
        els.narration.textContent = '本页旁白播放完成';
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  var renderDots = function () {
    if (!els.dots) return;
    els.dots.innerHTML = '';
    book.pages.forEach(function (_, index) {
      var dot = document.createElement('span');
      if (index === state.index) dot.className = 'active';
      els.dots.appendChild(dot);
    });
  };

  var renderBody = function (page) {
    if (!els.pageBody) return;
    els.pageBody.innerHTML = '';
    (page.body || []).forEach(function (paragraph) {
      var p = document.createElement('p');
      p.textContent = paragraph;
      els.pageBody.appendChild(p);
    });
  };

  var renderTasks = function () {
    if (!els.taskGrid) return;
    els.taskGrid.innerHTML = '';
    (book.taskCards || []).forEach(function (task) {
      var card = document.createElement('article');
      card.className = 'task-card';
      card.innerHTML = '<strong>' + task.code + ' ' + task.type + '</strong><span>' + task.focus + '</span>';
      els.taskGrid.appendChild(card);
    });
    if (els.taskHint) {
      els.taskHint.textContent = '打印动作请返回主流程中的“打印任务材料”页面完成。课程页现在只负责学习输入与任务预览。';
    }
  };

  var render = function () {
    var page = book.pages[state.index];
    if (els.subject) els.subject.textContent = book.subject;
    if (els.title) els.title.textContent = book.theme;
    if (els.summary) els.summary.textContent = book.summary;
    if (els.pageIndex) els.pageIndex.textContent = '第 ' + (state.index + 1) + ' 页 / 共 ' + book.pages.length + ' 页';
    if (els.pageTitle) els.pageTitle.textContent = page.title;
    if (els.pageTip) els.pageTip.textContent = page.tip;
    if (els.scene) els.scene.textContent = page.figure;
    if (els.sceneLabel) els.sceneLabel.textContent = page.sceneLabel;
    if (els.sceneCaption) els.sceneCaption.textContent = page.caption;
    renderBody(page);
    renderDots();
    renderTasks();
    speak();
  };

  if (els.prev) {
    els.prev.addEventListener('click', function () {
      state.index = clampIndex(state.index - 1);
      render();
    });
  }

  if (els.next) {
    els.next.addEventListener('click', function () {
      state.index = clampIndex(state.index + 1);
      render();
    });
  }

  if (els.speak) {
    els.speak.addEventListener('click', speak);
  }

  if (els.back) {
    els.back.addEventListener('click', function (event) {
      event.preventDefault();
      stopSpeech();
      goBack();
    });
  }

  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = function () {
      if (els.narration && !els.narration.textContent) {
        els.narration.textContent = '旁白已就绪';
      }
    };
  }

  render();
})();
