// Generated by CoffeeScript 1.9.0
(function() {
  var attr, attrs, bool, concat, esc, esca, isfunction, isplain, isstring, tag, tags, unnest, _buf,
    __slice = [].slice;

  isplain = function(o) {
    return !!o && typeof o === 'object' && o.constructor === Object;
  };

  isstring = function(s) {
    return typeof s === 'string';
  };

  isfunction = function(s) {
    return typeof s === 'function';
  };

  concat = function(as) {
    var _ref;
    return (_ref = []).concat.apply(_ref, as);
  };

  bool = {};

  'allowfullscreen,async,autofocus,autoplay,checked,controls,default,defer,disabled,formnovalidate,hidden,ismap,itemscope,loop,multiple,muted,name,novalidate,open,readonly,required,reversed,scoped,seamless,selected,sortable,typemustmatch,html'.split(',').forEach(function(a) {
    return bool[a] = true;
  });

  esc = function(s) {
    if (s == null) {
      s = '';
    }
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  };

  esca = function(s) {
    return esc(s).replace(/"/g, '&quot;');
  };

  attr = function(k, v) {
    if (bool[k]) {
      if (v) {
        return "" + (esca(k));
      } else {
        return '';
      }
    } else {
      return (esca(k)) + "=\"" + (esca(v)) + "\"";
    }
  };

  attrs = function(as) {
    var a, k, v;
    return (concat((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = as.length; _i < _len; _i++) {
        a = as[_i];
        _results.push((function() {
          var _results1;
          _results1 = [];
          for (k in a) {
            v = a[k];
            _results1.push(attr(k, v));
          }
          return _results1;
        })());
      }
      return _results;
    })())).join(' ');
  };

  unnest = function(bind, f) {
    if (isfunction(f)) {
      return unnest(bind, f.call(bind));
    } else if (isstring(f)) {
      return f;
    } else {
      return '';
    }
  };

  _buf = null;

  tag = function(name, vod) {
    var r;
    return r = function() {
      var a, args, f, funs, objs, _i, _len;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (!_buf) {
        try {
          _buf = [];
          r.apply(this, args);
          return _buf.join('');
        } finally {
          _buf = null;
        }
      }
      objs = args.filter(isplain);
      funs = args.map(function(a) {
        if (isstring(a)) {
          return function() {
            return esc(a);
          };
        } else {
          return a;
        }
      }).filter(isfunction);
      _buf.push(("<" + name) + (objs.length && (a = attrs(objs)).length ? " " + a : "") + ">");
      for (_i = 0, _len = funs.length; _i < _len; _i++) {
        f = funs[_i];
        _buf.push(unnest(this, f));
      }
      return _buf.push((vod ? "" : "</" + name + ">"));
    };
  };

  tags = {
    tag: tag
  };

  'html,head,style,title,address,article,body,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,blockquote,dd,div,dl,dt,figcaption,figure,li,main,ol,p,pre,ul,a,abbr,b,bdi,bdo,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,audio,map,video,iframe,object,canvas,noscript,script,del,ins,caption,colgroup,table,tbody,td,tfoot,th,thead,tr,button,datalist,fieldset,form,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,decorator,element,shadow,template'.split(',').forEach(function(t) {
    return tags[t] = tag(t);
  });

  'area,base,br,col,embed,hr,img,input,keygen,link,meta,param,source,track,wbr'.split(',').forEach(function(t) {
    return tags[t] = tag(t, true);
  });

  tags.html5 = function() {
    var as;
    as = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return tag('!DOCTYPE', true)({
      html: true
    }, '\n', function() {
      return tags.html.apply(tags, as);
    });
  };

  if (typeof module === 'object') {
    module.exports = tags;
  } else if (typeof define === 'function' && define.amd) {
    define(function() {
      return tags;
    });
  } else {
    this.tagg = tags;
  }

}).call(this);

//# sourceMappingURL=tagg.js.map