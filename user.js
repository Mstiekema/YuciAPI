module.exports = {
  followage: function(app, conf, reqst) {
    app.get('/followage/:user/:channel', function(req, res) {
      var usr = req.params.user
      var chnl = req.params.channel
      var tId = conf.cInfo.id
      var info = {
        url: 'https://api.twitch.tv/kraken/users/'+usr+'/follows/channels/'+chnl,
        headers: {
          'Client-ID': tId
        }
      }
      reqst(info, function (error, response, body) {
        body = JSON.parse(body)
        if(body.error) return res.send(body.message)
        var b = new Date(body["created_at"]);
        var n = new Date();
        var since = parseInt(b.getTime())
        var now = parseInt(n.getTime())
        var t = new Date(now - since);
        var pTime = new String()
        if((Math.floor(t.getUTCFullYear() - 1970)) != 0) {
          var y = Math.floor(t.getUTCFullYear() - 1970)
          pTime += y + " years "
        }
        if(Math.floor(t.getUTCMonth()) != 0) {
          var mo = Math.floor(t.getUTCMonth())
          pTime += mo + " months "
        }
        if(Math.floor(t.getUTCDate() - 1) != 0) {
          var d = Math.floor(t.getUTCDate() - 1)
          pTime += d + " days  "
        }
        if(Math.floor(t.getUTCHours()) != 0) {
          var h = Math.floor(t.getUTCHours());
          pTime += h + " hours "
        }
        if(Math.floor(t.getUTCMinutes()) != 0) {
          var mi = Math.floor(t.getUTCMinutes());
          pTime += mi + " minutes "
        }
        if(Math.floor(t.getUTCSeconds()) != 0) {
          var s = Math.floor(t.getUTCSeconds());
          pTime += s + " seconds"
        }
        res.send(pTime)
      })
    });
  },
  followsince: function(app, conf, reqst) {
    app.get('/followsince/:user/:channel', function(req, res) {
      var usr = req.params.user
      var chnl = req.params.channel
      var tId = conf.cInfo.id
      var info = {
        url: 'https://api.twitch.tv/kraken/users/'+usr+'/follows/channels/'+chnl,
        headers: {
          'Client-ID': tId
        }
      }
      reqst(info, function (error, response, body) {
        body = JSON.parse(body)
        if(body.error) return res.send(body.message)
        var since = new Date(body["created_at"])
        var d = since.getDate(); var mo = since.getMonth() + 1; var y = since.getFullYear();
        var h = since.getHours(); var mi = since.getMinutes(); var s = since.getSeconds();
        var date = d + "/" + mo + "/" + y
        var time = h + ":" + mi + ":" + s
        res.send(usr + " followed " + chnl + " on " + date + " at " + time)
      })
    });
  },
  followsinceRaw: function(app, conf, reqst) {
    app.get('/raw/followsince/:user/:channel', function(req, res) {
      var usr = req.params.user
      var chnl = req.params.channel
      var tId = conf.cInfo.id
      var info = {
        url: 'https://api.twitch.tv/kraken/users/'+usr+'/follows/channels/'+chnl,
        headers: {
          'Client-ID': tId
        }
      }
      reqst(info, function (error, response, body) {
        body = JSON.parse(body)
        if(body.error) return res.send(body.message)
        var since = new Date(body["created_at"])
        var d = since.getDate(); var mo = since.getMonth() + 1; var y = since.getFullYear();
        var h = since.getHours(); var mi = since.getMinutes(); var s = since.getSeconds();
        var date = d + "/" + mo + "/" + y
        var time = h + ":" + mi + ":" + s
        res.send(date + " at " + time)
      })
    });
  },
  age: function(app, conf, reqst) {
    app.get('/user/age/:user', function(req, res) {
      var usr = req.params.user
      var tId = conf.cInfo.id
      var info = {
        url: 'https://api.twitch.tv/kraken/users/'+usr,
        headers: {
          'Client-ID': tId
        }
      }
      reqst(info, function (error, response, body) {
        body = JSON.parse(body)
        if(body.error) return res.send(body.message)
        var since = new Date(body["created_at"])
        var d = since.getDate(); var mo = since.getMonth() + 1; var y = since.getFullYear();
        var cDate = d + "/" + mo + "/" + y
        res.send(usr + "'s account was created on " + cDate);
      })
    });
  },
  ageRaw: function(app, conf, reqst) {
    app.get('/raw/user/age/:user', function(req, res) {
      var usr = req.params.user
      var tId = conf.cInfo.id
      var info = {
        url: 'https://api.twitch.tv/kraken/users/'+usr,
        headers: {
          'Client-ID': tId
        }
      }
      reqst(info, function (error, response, body) {
        body = JSON.parse(body)
        if(body.error) return res.send(body.message)
        var since = new Date(body["created_at"])
        var d = since.getDate(); var mo = since.getMonth() + 1; var y = since.getFullYear();
        var cDate = d + "/" + mo + "/" + y
        res.send(cDate);
      })
    });
  },
  id: function(app, conf, reqst) {
    app.get('/user/id/:user', function(req, res) {
      var usr = req.params.user
      var tId = conf.cInfo.id
      var info = {
        url: 'https://api.twitch.tv/kraken/users?login='+usr,
        headers: {
          'Client-ID': tId,
          'Accept': 'application/vnd.twitchtv.v5+json'
        }
      }
      reqst(info, function (error, response, body) {
        if (JSON.parse(body).users == undefined || JSON.parse(body).users[0] == undefined) return res.send("This user does not exist")
        res.send(JSON.parse(body).users[0]["_id"])
      })
    });
  },
  pf: function(app, conf, reqst) {
    app.get('/user/pf/:user', function(req, res) {
      var usr = req.params.user
      var tId = conf.cInfo.id
      var info = {
        url: 'https://api.twitch.tv/kraken/users?login='+usr,
        headers: {
          'Client-ID': tId,
          'Accept': 'application/vnd.twitchtv.v5+json'
        }
      }
      reqst(info, function (error, response, body) {
        if (JSON.parse(body).users == undefined || JSON.parse(body).users[0] == undefined) return res.send("This user does not exist")
        res.send(JSON.parse(body).users[0].logo)
      })
    });
  },
  followers: function(app, conf, reqst) {
    app.get('/user/followers/:user', function(req, res) {
      var usr = req.params.user
      var tId = conf.cInfo.id
      var info = {
        url: 'https://api.twitch.tv/kraken/users?login='+usr,
        headers: {
          'Client-ID': tId,
          'Accept': 'application/vnd.twitchtv.v5+json'
        }
      }
      reqst(info, function (error, response, body) {
        if (JSON.parse(body).users == undefined || JSON.parse(body).users[0] == undefined) return res.send("This user does not exist")
        var userId = JSON.parse(body).users[0]["_id"]
        var info = {
          url: 'https://api.twitch.tv/kraken/channels/'+userId,
          headers: {
            'Client-ID': tId,
            'Accept': 'application/vnd.twitchtv.v5+json'
          }
        }
        reqst(info, function (error, response, body) {
          res.send(JSON.parse(body).followers.toString())
        })
      })
    });
  },
  game: function(app, conf, reqst) {
    app.get('/user/game/:user', function(req, res) {
      var usr = req.params.user
      var tId = conf.cInfo.id
      var info = {
        url: 'https://api.twitch.tv/kraken/users?login='+usr,
        headers: {
          'Client-ID': tId,
          'Accept': 'application/vnd.twitchtv.v5+json'
        }
      }
      reqst(info, function (error, response, body) {
        if (JSON.parse(body).users == undefined || JSON.parse(body).users[0] == undefined) return res.send("This user does not exist")
        var userId = JSON.parse(body).users[0]["_id"]
        var info = {
          url: 'https://api.twitch.tv/kraken/channels/'+userId,
          headers: {
            'Client-ID': tId,
            'Accept': 'application/vnd.twitchtv.v5+json'
          }
        }
        reqst(info, function (error, response, body) {
          res.send(JSON.parse(body).game)
        })
      })
    });
  },
  title: function(app, conf, reqst) {
    app.get('/user/title/:user', function(req, res) {
      var usr = req.params.user
      var tId = conf.cInfo.id
      var info = {
        url: 'https://api.twitch.tv/kraken/users?login='+usr,
        headers: {
          'Client-ID': tId,
          'Accept': 'application/vnd.twitchtv.v5+json'
        }
      }
      reqst(info, function (error, response, body) {
        if (JSON.parse(body).users == undefined || JSON.parse(body).users[0] == undefined) return res.send("This user does not exist")
        var userId = JSON.parse(body).users[0]["_id"]
        var info = {
          url: 'https://api.twitch.tv/kraken/channels/'+userId,
          headers: {
            'Client-ID': tId,
            'Accept': 'application/vnd.twitchtv.v5+json'
          }
        }
        reqst(info, function (error, response, body) {
          res.send(JSON.parse(body).status)
        })
      })
    });
  },
  uptime: function(app, conf, reqst) {
    app.get('/user/uptime/:user', function(req, res) {
      var usr = req.params.user
      var tId = conf.cInfo.id
      var info = {
        url: 'https://api.twitch.tv/kraken/users?login='+usr,
        headers: {
          'Client-ID': tId,
          'Accept': 'application/vnd.twitchtv.v5+json'
        }
      }
      reqst(info, function (error, response, body) {
        if (JSON.parse(body).users == undefined || JSON.parse(body).users == undefined || JSON.parse(body).users[0] == undefined) return res.send("This user does not exist")
        var userId = JSON.parse(body).users[0]["_id"]
        var info = {
          url: 'https://api.twitch.tv/kraken/streams/'+userId,
          headers: {
            'Client-ID': tId,
            'Accept': 'application/vnd.twitchtv.v5+json'
          }
        }
        reqst(info, function (error, response, body) {
          body = JSON.parse(body)
          if (body.stream == null) return res.send(req.params.user + " is not live")

          var b = new Date(body.stream["created_at"]);
          var n = new Date();
          var since = parseInt(b.getTime())
          var now = parseInt(n.getTime())
          var t = new Date(now - since);
          var pTime = new String()
          if(Math.floor(t.getUTCDate() - 1) != 0) {
            var d = Math.floor(t.getUTCDate() - 1)
            pTime += d + " days  "
          }
          if(Math.floor(t.getUTCHours()) != 0) {
            var h = Math.floor(t.getUTCHours());
            pTime += h + " hours "
          }
          if(Math.floor(t.getUTCMinutes()) != 0) {
            var mi = Math.floor(t.getUTCMinutes());
            pTime += mi + " minutes "
          }
          if(Math.floor(t.getUTCSeconds()) != 0) {
            var s = Math.floor(t.getUTCSeconds());
            pTime += s + " seconds"
          }
          res.send(pTime)
        })
      })
    });
  },
  viewers: function(app, conf, reqst) {
    app.get('/user/viewers/:user', function(req, res) {
      var usr = req.params.user
      var tId = conf.cInfo.id
      var info = {
        url: 'https://api.twitch.tv/kraken/users?login='+usr,
        headers: {
          'Client-ID': tId,
          'Accept': 'application/vnd.twitchtv.v5+json'
        }
      }
      reqst(info, function (error, response, body) {
        if (JSON.parse(body).users == undefined || JSON.parse(body).users[0] == undefined) return res.send("This user does not exist")
        var userId = JSON.parse(body).users[0]["_id"]
        var info = {
          url: 'https://api.twitch.tv/kraken/streams/'+userId,
          headers: {
            'Client-ID': tId,
            'Accept': 'application/vnd.twitchtv.v5+json'
          }
        }
        reqst(info, function (error, response, body) {
          if (JSON.parse(body).stream == null) return res.send(req.params.user + " is not live")
          res.send(JSON.parse(body).stream.viewers.toString())
        })
      })
    });
  }
}
