//remove:
var main = require('../build/dom4.node.js');
//:remove

function create(name) {
  return document.createElement(name);
}

wru.test([
  {
    name: "prototype has methods",
    test: function () {
      var div = create('div');
      wru.assert('.prepend()', div.prepend);
      wru.assert('.append()', div.append);
      wru.assert('.before()', div.before);
      wru.assert('.after()', div.after);
      wru.assert('.replace()', div.replace);
      wru.assert('.remove()', div.remove);
    }
  },{
    name: 'prepend',
    test: function () {
      var div = create('div'),
          first = div.appendChild(create('div')),
          another = create('div');
      div.prepend(another);
      wru.assert(
        "Pre-insert node into the context object before the context object's first child.",
        div.firstChild === another &&
        div.lastChild === first
      );
      div.prepend(
        create('one'),
        'two',
        create('three')
      );
      wru.assert(
        'works with multiple nodes',
        div.childNodes.length === 5 &&
        div.firstChild.nodeName.toLowerCase() === 'one' &&
        div.childNodes[1].nodeType !== 1 &&
        div.childNodes[1].nodeValue === 'two' &&
        div.childNodes[2].nodeName.toLowerCase() === 'three' &&
        div.childNodes[3] === another &&
        div.childNodes[4] === first
      );
    }
  },{
    name: 'append',
    test: function () {
      var div = create('div'),
          first = div.appendChild(create('div')),
          another = create('div');
      div.append(another);
      wru.assert(
        "Append node to the context object.",
        div.firstChild === first &&
        div.lastChild === another
      );
      div.append(
        create('one'),
        'two',
        create('three')
      );
      wru.assert(
        'works with multiple nodes',
        div.childNodes[0] === first &&
        div.childNodes[1] === another &&
        div.childNodes[2].nodeName.toLowerCase() === 'one' &&
        div.childNodes[3].nodeType !== 1 &&
        div.childNodes[3].nodeValue === 'two' &&
        div.childNodes[4].nodeName.toLowerCase() === 'three'
      );
    }
  },{
    name: 'before',
    test: function () {
      var div = create('div'),
          first = div.appendChild(create('div')),
          node = create('div');
      wru.assert(
        'If the context object does not have a parent, terminate these steps',
        !div.before(node)
      );
      first.before(node);
      wru.assert(
        "Pre-insert node into the context object's parent before the context object.",
        div.firstChild === node
      );
      first.before(create('one'), 'two');
      wru.assert(
        'works with multiple nodes',
        div.childNodes[0] === node &&
        div.childNodes[1].nodeName.toLowerCase() === 'one' &&
        div.childNodes[2].nodeType !== 1 &&
        div.childNodes[2].nodeValue === 'two' &&
        div.childNodes[3] === first
      );
    }
  },{
    name: 'after',
    test: function () {
      var div = create('div'),
          first = div.appendChild(create('div')),
          node = create('div');
      wru.assert(
        'If the context object does not have a parent, terminate these steps',
        !div.after(node)
      );
      first.after(node);
      wru.assert(
        "Pre-insert node into the context object's parent before the context object's next sibling.",
        div.lastChild === node
      );
      first.after(create('one'), 'two');
      wru.assert(
        'works with multiple nodes',
        div.childNodes[0] === first &&
        div.childNodes[1].nodeName.toLowerCase() === 'one' &&
        div.childNodes[2].nodeType !== 1 &&
        div.childNodes[2].nodeValue === 'two' &&
        div.childNodes[3] === node
      );
    }
  },{
    name: 'replace',
    test: function () {
      var div = create('div'),
          first = div.appendChild(create('div')),
          node = create('div');
      wru.assert(
        'If the context object does not have a parent, terminate these steps',
        !div.replace(node)
      );
      first.replace(node);
      wru.assert(
        "Replace the context object with node within the context object's parent.",
        div.firstChild === node &&
        div.childNodes.length === 1
      );
      node.replace(create('one'), 'two');
      wru.assert(
        'works with multiple nodes',
        div.childNodes[0].nodeName.toLowerCase() === 'one' &&
        div.childNodes[1].nodeType !== 1 &&
        div.childNodes[1].nodeValue === 'two' &&
        div.childNodes.length === 2
      );
    }
  },{
    name: 'remove',
    test: function () {
      var div = create('div'),
          first = div.appendChild(create('div'));
      wru.assert(
        'If the context object does not have a parent, terminate these steps',
        !div.remove()
      );
      first.remove();
      wru.assert(
        "Remove the context object from the context object's parent.",
        div.childNodes.length === 0
      );
    }
  },{
    name: 'DOMTokenList',
    test: function () {
      wru.assert('it exists', create('div').classList);
    }
  },{
    name: 'DOMTokenList#length',
    test: function () {
      var div = create('div'),
          classList = div.classList;
      wru.assert('no tokens', classList.length === 0);
      div.className = 'a b c';
      classList = div.classList;
      wru.assert('3 tokens', classList.length === 3);
      classList.remove('a', 'b');
      wru.assert('1 token', classList.length === 1);
      classList.remove('c');
      wru.assert('no tokens', classList.length === 0);
    }
  },{
    name: 'DOMTokenList#item(i)',
    test: function () {
      var div = create('div'),
          classList = div.classList;
      wru.assert('returns null', classList.item(0) === null);    
      wru.assert('returns nullish', classList[0] == null);
      classList.add('z');
      wru.assert('returns z', classList.item(0) === 'z');    
      wru.assert('returns [] z', classList[0] == 'z');
      classList.add('Z');
      wru.assert('returns Z', classList.item(1) === 'Z');    
      wru.assert('returns [] Z', classList[1] == 'Z');
      wru.assert('returns still z', classList.item(0) === 'z');    
      wru.assert('returns still [] z', classList[0] == 'z');
    }
  },{
    name: 'DOMTokenList#contains(token)',
    test: function () {
      var div = create('div'),
          classList = div.classList;
      wru.assert('no bla', classList.contains('bla') === false);
      div.className = 'bla';
      classList = div.classList;
      wru.assert('yes bla', classList.contains('bla') === true);
      wru.assert('no Bla', classList.contains('Bla') === false);
      classList.add('Bla');
      wru.assert('yes Bla', classList.contains('Bla') === true);
      wru.assert('still bla', classList.contains('bla') === true);
      try {
        classList.contains('');
      } catch(e) {
        wru.assert('throws with empty strings', 1);
        try {
          classList.contains('a ');
        } catch(e) {
          wru.assert('throws with spaces', 1);
        }
      }
    }
  }, {
    name: 'DOMTokenList#add(tokens...)',
    test: function () {
      var div = create('div'),
          classList = div.classList;
      classList.add('a', 'b', 'c');
      wru.assert('added all the things', div.className === 'a\x20b\x20c');
      classList.add('z');
      wru.assert('added z too', div.className === 'a\x20b\x20c\x20z');
      classList.add('b');
      wru.assert('did not add b again', div.className === 'a\x20b\x20c\x20z');
    }
  },{
    name: 'DOMTokenList#remove(tokens...)',
    test: function () {
      var div = create('div'),
          classList;
      div.className = 'a\x20b\x20c';
      classList = div.classList;
      classList.remove('a', 'c');
      wru.assert('removed two tokens', div.className === 'b');
      classList.remove('b');
      wru.assert('removed last token', div.className === '');
      classList.remove('b');
      wru.assert('nothing happened', div.className === '');
    }
  }, {
    name: 'DOMTokenList#toggle(token, force)',
    test: function () {
      var div = create('div'),
          classList = div.classList;
      classList.add('a');
      wru.assert('If token is a case-sensitive match for one of tokens and force is not true (either false or omitted)',
        classList.toggle('a') === false && classList.length === 0);
      classList.add('b');
      wru.assert('If token is a case-sensitive match for one of tokens and force is true (neither false nor omitted)',
        classList.toggle('b', true) && classList.length === 1 && classList[0] === 'b');
      wru.assert('If force is false (neither true nor omitted)',
        classList.toggle('z', false) === false && !classList.contains('z'));
      wru.assert('If force is true',
        classList.toggle('z', true) === true && classList.contains('z'));
      wru.assert('If force is omitted same as true',
        classList.toggle('t', true) === true && classList.contains('t'));
    }
  }, {
    name: 'DOMTokenList#toString()',
    test: function () {
      var div = create('div');
      div.className = 'a\x20b\x20c\x20d';
      wru.assert('same as classname', div.className == div.classList);
    }
  }
]);