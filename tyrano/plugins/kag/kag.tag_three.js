$.three_pos = function (str) {
  var obj = {};
  arr_obj = str.split(",");
  if (1 == arr_obj.length) {
    obj.x = parseFloat(arr_obj[0]);
    obj.y = parseFloat(arr_obj[0]);
    obj.z = parseFloat(arr_obj[0]);
  } else {
    obj.x = parseFloat(arr_obj[0]);
    obj.y = parseFloat(arr_obj[1]);
    obj.z = parseFloat(arr_obj[2]);
  }
  return obj;
};
$.setVector = function (model) {
  var vector = {};
  vector.pos = {
    x: model.position.x,
    y: model.position.y,
    z: model.position.z,
  };
  vector.rot = {
    x: model.rotation.x,
    y: model.rotation.y,
    z: model.rotation.z,
  };
  vector.scale = { x: model.scale.x, y: model.scale.y, z: model.scale.z };
  return vector;
};
$.orgFloor = function (value, base) {
  return Math.floor(value * base) / base;
};
$.checkThreeModel = function (name) {
  if (TYRANO.kag.tmp.three.models[name]) return !0;
  alert("model「" + name + "」は未定義です。宣言してください。");
};
tyrano.plugin.kag.tag["3d_init"] = {
  vital: [],
  pm: {
    layer: "0",
    page: "fore",
    camera: "Perspective",
    near: "1",
    far: "5000",
    next: "true",
  },
  clock: {},
  start: function (pm) {
    var that = this,
      target_layer = this.kag.layer.getLayer(pm.layer, pm.page);
    this.clock = new THREE.Clock();
    if ($(".three_canvas").length > 0) {
      this.kag.ftag.nextOrder();
      return;
    }
    var j_canvas = $("<canvas id='three' class='three_canvas'></canvas>"),
      sc_width = parseInt(this.kag.config.scWidth),
      sc_height = parseInt(this.kag.config.scHeight);
    j_canvas.css({ position: "absolute", width: sc_width, height: sc_height });
    target_layer.append(j_canvas);
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#three"),
      alpha: !0,
      antialias: !0,
      preserveDrawingBuffer: !0,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(sc_width, sc_height);
    const scene = new THREE.Scene(),
      camera_mode = pm.camera + "Camera",
      camera = new THREE[camera_mode](
        45,
        sc_width / sc_height,
        parseFloat(pm.near),
        parseFloat(pm.far),
      );
    camera.rotation.order = "YXZ";
    camera.position.set(0, 0, 1e3);
    this.kag.tmp.three.models.camera = new ThreeModel(
      { name: "camera", model: camera, mixer: null, gltf: null, pm: pm },
      three,
    );
    target_layer.show();
    const light_amb = new THREE.AmbientLight(16777215, 1);
    scene.add(light_amb);
    const light = new THREE.DirectionalLight(16777215, 1);
    scene.add(light);
    this.kag.tmp.three.stat.is_load = !0;
    this.kag.tmp.three.stat.canvas_show = !0;
    this.kag.tmp.three.stat.init_pm = pm;
    this.kag.tmp.three.camera = camera;
    this.kag.tmp.three.scene = scene;
    this.kag.tmp.three.renderer = renderer;
    this.kag.tmp.three.light_amb = light_amb;
    this.kag.tmp.three.target_layer = target_layer;
    this.kag.tmp.three.j_canvas = j_canvas;
    var three = this.kag.tmp.three;
    !(function tick() {
      three.orbit_controls && three.orbit_controls.update();
      that.updateFrame();
      renderer.render(scene, camera);
      var req_id = requestAnimationFrame(tick);
      0 == three.stat.is_load && window.cancelAnimationFrame(req_id);
    })();
    Math.random();
    this.initEvent(this.kag.tmp.three);
    "true" == pm.next && this.kag.ftag.nextOrder();
  },
  initEvent: function (three) {
    var that = this,
      j_canvas = (three.renderer, three.target_layer, three.j_canvas),
      camera = three.camera,
      scene = three.scene;
    j_canvas.on("click", function (event) {
      var x = event.clientX,
        y = event.clientY,
        mouse = new THREE.Vector2();
      mouse.x = (x / window.innerWidth) * 2 - 1;
      mouse.y = (-y / window.innerHeight) * 2 + 1;
      var raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      var intersects = raycaster.intersectObjects(scene.children, !0);
      if (intersects.length > 0) {
        var name = intersects[0].object.userData.name;
        if (1 == that.kag.stat.is_strong_stop && three.evt[name]) {
          that.kag.layer.showEventLayer();
          that.kag.ftag.startTag("jump", three.evt[name]);
          return;
        }
      }
    });
  },
  updateFrame: function () {
    var three = this.kag.tmp.three,
      camera = three.camera,
      models = three.models,
      delta = this.clock.getDelta();
    for (key in models) models[key].mixer && models[key].update(delta);
    if (1 == three.stat.gyro.mode) {
      camera.rotation.x = three.stat.gyro.x;
      camera.rotation.y = three.stat.gyro.y;
    } else if (2 == three.stat.gyro.mode) {
      camera.position.x = three.stat.gyro.x;
      camera.position.y = three.stat.gyro.y;
    }
  },
};
tyrano.plugin.kag.tag["3d_model_new"] = {
  vital: ["name", "storage"],
  pm: {
    name: "",
    storage: "",
    pos: "0",
    rot: "0",
    scale: "100",
    tonemap: "true",
    motion: "",
    next: "true",
    folder: "",
  },
  start: function (pm) {
    var three = this.kag.tmp.three,
      folder = "";
    folder = "" != pm.folder ? pm.folder : "others/3d/model";
    var ext = $.getExt(pm.storage);
    if ("gltf" == ext || "glb" == ext) {
      var storage_url = "./data/" + folder + "/" + pm.storage;
      new THREE.GLTFLoader().load(storage_url, (data) => {
        var gltf = data,
          model = gltf.scene;
        let pos = $.three_pos(pm.pos),
          scale = $.three_pos(pm.scale),
          rot = $.three_pos(pm.rot);
        model.position.set(pos.x, pos.y, pos.z);
        model.scale.set(scale.x, scale.y, scale.z);
        model.rotation.set(rot.x, rot.y, rot.z);
        const animations = gltf.animations;
        let mixer = new THREE.AnimationMixer(model);
        if (animations.length > 0) {
          let anim = animations[0];
          if ("" != pm.motion)
            for (var i = 0; i < animations.length; i++) {
              if (animations[i].name == pm.motion) {
                anim = animations[i];
                break;
              }
            }
          mixer.clipAction(anim).play();
        } else mixer = void 0;
        this.kag.tmp.three.models[pm.name] = new ThreeModel(
          { name: pm.name, model: model, mixer: mixer, gltf: gltf, pm: pm },
          three,
        );
        "true" == pm.tonemap
          ? this.kag.tmp.three.models[pm.name].setToneMaped(!0)
          : this.kag.tmp.three.models[pm.name].setToneMaped(!1);
        "true" == pm.next && this.kag.ftag.nextOrder();
      });
    } else if ("obj" == ext) {
      var obj_url = "./data/" + folder + "/" + pm.storage,
        mtl_url = obj_url.replace(".obj", ".mtl");
      new THREE.MTLLoader().load(mtl_url, (materials) => {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        materials.toneMaped = !1;
        objLoader.load(obj_url, (obj) => {
          var model = obj;
          let pos = $.three_pos(pm.pos),
            scale = $.three_pos(pm.scale),
            rot = $.three_pos(pm.rot);
          model.position.set(pos.x, pos.y, pos.z);
          model.scale.set(scale.x, scale.y, scale.z);
          model.rotation.set(rot.x, rot.y, rot.z);
          this.kag.tmp.three.models[pm.name] = new ThreeModel(
            { name: pm.name, model: model, pm: pm },
            three,
          );
          "true" == pm.tonemap
            ? this.kag.tmp.three.models[pm.name].setToneMaped(!0)
            : this.kag.tmp.three.models[pm.name].setToneMaped(!1);
          "true" == pm.next && this.kag.ftag.nextOrder();
        });
      });
    } else
      "mmd" == ext ||
        alert("エラー：" + ext + "はサポートしていないファイル形式です");
  },
};
tyrano.plugin.kag.tag["3d_sphere_new"] = {
  vital: ["name"],
  pm: {
    name: "",
    type: "SphereGeometry",
    texture: "",
    color: "0x00ff00",
    radius: "300",
    width: "30",
    height: "30",
    scale: "1",
    pos: "0",
    rot: "0",
    folder: "",
  },
  start: function (pm) {
    pm.arg1 = pm.radius;
    pm.arg2 = pm.width;
    pm.arg3 = pm.height;
    this.kag.ftag.startTag("obj_model_new", pm);
  },
};
tyrano.plugin.kag.tag["3d_sprite_new"] = {
  vital: ["name", "storage"],
  pm: {
    name: "",
    storage: "",
    scale: "",
    pos: "0",
    rot: "0",
    tonemap: "false",
    next: "true",
    folder: "",
  },
  start: function (pm) {
    var storage_url =
      "./data/" +
      ("" != pm.folder ? pm.folder : "others/3d/sprite") +
      "/" +
      pm.storage;
    const material = new THREE.SpriteMaterial({
      map: new THREE.TextureLoader().load(storage_url),
      alphaTest: 0.01,
      transparent: !0,
    });
    "true" == pm.tonemap
      ? (material.toneMapped = !0)
      : (material.toneMapped = !1);
    var model = new THREE.Sprite(material);
    $("<img />")
      .attr("src", storage_url)
      .on("load", (e) => {
        var width = $(e.currentTarget).get(0).width,
          height = $(e.currentTarget).get(0).height;
        let pos = $.three_pos(pm.pos),
          rot = $.three_pos(pm.rot);
        model.position.set(pos.x, pos.y, pos.z);
        model.rotation.set(rot.x, rot.y, rot.z);
        if ("" == pm.scale)
          model.scale.set(1 * parseInt(width), 1 * parseInt(height), 1);
        else {
          let scale = $.three_pos(pm.scale);
          model.scale.set(scale.x, scale.y, scale.z);
        }
        var three = this.kag.tmp.three;
        three.scene;
        this.kag.tmp.three.models[pm.name] = new ThreeModel(
          { name: pm.name, model: model, pm: pm },
          three,
        );
        "true" == pm.next && this.kag.ftag.nextOrder();
      });
  },
};
tyrano.plugin.kag.tag["3d_event"] = {
  vital: ["name"],
  pm: { name: "", storage: "", target: "" },
  start: function (pm) {
    var three = this.kag.tmp.three;
    three.stat.start_event = !0;
    three.evt[pm.name] = pm;
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_event_delete"] = {
  vital: ["name"],
  pm: { name: "" },
  start: function (pm) {
    delete this.kag.tmp.three.evt[pm.name];
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_event_start"] = {
  vital: [],
  pm: {},
  start: function (pm) {
    this.kag.tmp.three.stat.start_event = !0;
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_event_stop"] = {
  vital: [],
  pm: {},
  start: function (pm) {
    this.kag.tmp.three.stat.start_event = !1;
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_box_new"] = {
  vital: ["name"],
  pm: {
    name: "",
    type: "BoxGeometry",
    texture: "",
    color: "0x00ff00",
    width: "1",
    height: "1",
    depth: "1",
    scale: "1",
    pos: "0",
    rot: "0",
    folder: "",
  },
  start: function (pm) {
    pm.arg1 = pm.width;
    pm.arg2 = pm.height;
    pm.arg3 = pm.depth;
    this.kag.ftag.startTag("obj_model_new", pm);
  },
};
tyrano.plugin.kag.tag["3d_image_new"] = {
  vital: ["name", "width"],
  pm: {
    name: "",
    type: "PlaneGeometry",
    texture: "",
    width: "",
    height: "",
    scale: "1",
    pos: "0",
    rot: "0",
    doubleside: "false",
    tonemap: "false",
  },
  start: function (pm) {
    if ("" == pm.height) {
      var texture_url = "./data/others/3d/texture/" + pm.texture;
      $("<img />")
        .attr("src", texture_url)
        .on("load", (e) => {
          var width = $(e.currentTarget).get(0).width,
            tmp = $(e.currentTarget).get(0).height / width;
          pm.height = parseInt(parseInt(pm.width) * tmp);
          pm.arg1 = pm.width;
          pm.arg2 = pm.height;
          pm.arg3 = 1;
          this.kag.ftag.startTag("obj_model_new", pm);
        });
    } else {
      pm.arg1 = pm.width;
      pm.arg2 = pm.height;
      pm.arg3 = 1;
      this.kag.ftag.startTag("obj_model_new", pm);
    }
  },
};
tyrano.plugin.kag.tag.obj_model_new = {
  vital: ["name", "type"],
  pm: {
    name: "",
    type: "",
    texture: "",
    color: "",
    arg1: 0,
    arg2: 0,
    arg3: 0,
    scale: "",
    pos: "",
    rot: "",
    doubleside: "false",
    tonemap: "true",
    motion: "",
    folder: "",
    next: "true",
  },
  start: function (pm) {
    var three = this.kag.tmp.three;
    three.scene;
    const geometry = new THREE[pm.type](
      parseFloat(pm.arg1),
      parseFloat(pm.arg2),
      parseFloat(pm.arg3),
    );
    let material;
    if ("" != pm.texture)
      if ("BoxGeometry" == pm.type && pm.texture.split(",").length > 1) {
        var arr_texture = pm.texture.split(","),
          arr_material = [];
        const loader = new THREE.TextureLoader();
        for (let i = 0; i < arr_texture.length; i++) {
          var texture_url = "./data/others/3d/texture/" + arr_texture[i];
          const texture = loader.load(texture_url);
          arr_material.push(new THREE.MeshStandardMaterial({ map: texture }));
        }
        material = arr_material;
      } else {
        texture_url = "./data/others/3d/texture/" + pm.texture;
        const texture = new THREE.TextureLoader().load(texture_url);
        material = new THREE.MeshStandardMaterial({
          map: texture,
          alphaTest: 0.01,
          transparent: !0,
        });
      }
    else
      material = new THREE.MeshStandardMaterial({
        color: parseInt(pm.color.toLowerCase()),
      });
    "true" == pm.doubleside && (material.side = THREE.DoubleSide);
    "true" == pm.tonemap
      ? (material.toneMapped = !0)
      : (material.toneMapped = !1);
    const model = new THREE.Mesh(geometry, material);
    let pos = $.three_pos(pm.pos),
      scale = $.three_pos(pm.scale),
      rot = $.three_pos(pm.rot);
    model.position.set(pos.x, pos.y, pos.z);
    model.scale.set(scale.x, scale.y, scale.z);
    model.rotation.set(rot.x, rot.y, rot.z);
    this.kag.tmp.three.models[pm.name] = new ThreeModel(
      { name: pm.name, model: model, pm: pm },
      three,
    );
    "true" == pm.next && this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_show"] = {
  vital: ["name"],
  pm: { name: "", time: "500", scale: "", pos: "", rot: "", wait: "true" },
  start: function (pm) {
    var three = this.kag.tmp.three;
    if (0 != $.checkThreeModel(pm.name)) {
      var model = this.kag.tmp.three.models[pm.name];
      three.scene.add(model.model);
      var options = { duration: parseInt(pm.time) };
      if ("" != pm.pos) {
        let pos = $.three_pos(pm.pos);
        model.setPosition(pos.x, pos.y, pos.z);
      }
      if ("" != pm.scale) {
        let scale = $.three_pos(pm.scale);
        model.setScale(scale.x, scale.y, scale.z);
      }
      if ("" != pm.rot) {
        let rot = $.three_pos(pm.rot);
        model.setRotation(rot.x, rot.y, rot.z);
      }
      if ("true" == pm.wait)
        model.fade("in", options, () => {
          this.kag.ftag.nextOrder();
        });
      else {
        model.fade("in", options);
        this.kag.ftag.nextOrder();
      }
    }
  },
};
tyrano.plugin.kag.tag["3d_hide"] = {
  vital: ["name"],
  pm: { name: "", time: "500", next: "true", wait: "true" },
  start: function (pm) {
    if (0 != $.checkThreeModel(pm.name)) {
      var three = this.kag.tmp.three,
        options = { duration: parseInt(pm.time) },
        model = this.kag.tmp.three.models[pm.name];
      if ("true" == pm.wait)
        model.fade("out", options, (_model) => {
          this.kag.ftag.nextOrder();
          three.scene.remove(_model);
        });
      else {
        model.fade("out", options, (_model) => {
          three.scene.remove(_model);
        });
        this.kag.ftag.nextOrder();
      }
    }
  },
};
tyrano.plugin.kag.tag["3d_hide_all"] = {
  vital: [],
  pm: { time: "500", wait: "true" },
  start: function (pm) {
    var three = this.kag.tmp.three,
      options = { duration: parseInt(pm.time) },
      models = this.kag.tmp.three.models,
      cnt_fade = 0,
      fin_fade = 0;
    for (let key in models)
      if ("camera" != key) {
        cnt_fade++;
        if ("true" == pm.wait)
          models[key].fade("out", options, (_model) => {
            three.scene.remove(_model);
            fin_fade++;
            cnt_fade == fin_fade && this.kag.ftag.nextOrder();
          });
        else {
          models[key].fade("out", options, (_model) => {
            three.scene.remove(_model);
            fin_fade++;
          });
          this.kag.ftag.nextOrder();
        }
      }
    0 == cnt_fade && this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_delete"] = {
  vital: ["name"],
  pm: { name: "" },
  start: function (pm) {
    if (0 != $.checkThreeModel(pm.name)) {
      var three = this.kag.tmp.three,
        model = this.kag.tmp.three.models[pm.name];
      three.scene.remove(model.model);
      delete this.kag.tmp.three.models[pm.name];
      this.kag.ftag.nextOrder();
    }
  },
};
tyrano.plugin.kag.tag["3d_delete_all"] = {
  vital: [],
  pm: {},
  start: function (pm) {
    var three = this.kag.tmp.three,
      models = this.kag.tmp.three.models;
    for (let key in models)
      if ("camera" != key) {
        var model = models[key];
        three.scene.remove(model.model);
        delete three.models[key];
      }
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_canvas_show"] = {
  vital: [],
  pm: { time: "1000" },
  start: function (pm) {
    var three = this.kag.tmp.three;
    this.kag.tmp.three.stat.canvas_show = !0;
    three.j_canvas.fadeIn(parseInt(pm.time), () => {
      this.kag.ftag.nextOrder();
    });
  },
};
tyrano.plugin.kag.tag["3d_canvas_hide"] = {
  vital: [],
  pm: { time: "1000" },
  start: function (pm) {
    var three = this.kag.tmp.three;
    this.kag.tmp.three.stat.canvas_show = !1;
    three.j_canvas.fadeOut(parseInt(pm.time), () => {
      this.kag.ftag.nextOrder();
    });
  },
};
tyrano.plugin.kag.tag["3d_close"] = {
  vital: [],
  pm: {},
  start: function (pm) {
    var three = this.kag.tmp.three;
    three.stat.is_load = !1;
    three.stat.canvas_show = !1;
    three.j_canvas && three.j_canvas.remove();
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_anim"] = {
  vital: ["name"],
  pm: {
    name: "",
    time: "1000",
    effect: "linear",
    pos: "",
    rot: "",
    scale: "",
    lookat: "",
    wait: "true",
  },
  start: function (pm) {
    if (0 != $.checkThreeModel(pm.name)) {
      var three = this.kag.tmp.three,
        options = { duration: parseInt(pm.time), easing: pm.effect },
        map_type = {};
      if ("" != pm.pos)
        if ("camera" == pm.name && "" != pm.lookat)
          if (three.models[pm.lookat]) {
            var model = three.models[pm.lookat].model;
            (pos = { x: 0, y: 0, z: 0 }).x = model.position.x;
            pos.y = model.position.y;
            pos.z = model.position.z;
            map_type.position = pos;
          } else map_type.position = $.three_pos(pm.lookat);
        else map_type.position = $.three_pos(pm.pos);
      "" != pm.rot && (map_type.rotation = $.three_pos(pm.rot));
      "" != pm.scale && (map_type.scale = $.three_pos(pm.scale));
      var cnt_fin = 0,
        cnt_type = Object.keys(map_type).length;
      for (let key in map_type) {
        var pos = map_type[key],
          type = key;
        this.kag.tmp.three.models[pm.name].toAnim(type, pos, options, () => {
          ++cnt_fin >= cnt_type &&
            "true" == pm.wait &&
            this.kag.ftag.nextOrder();
        });
      }
      "true" != pm.wait && this.kag.ftag.nextOrder();
    }
  },
};
tyrano.plugin.kag.tag["3d_anim_stop"] = {
  vital: ["name"],
  pm: { name: "", finish: "true" },
  start: function (pm) {
    if (0 != $.checkThreeModel(pm.name)) {
      this.kag.tmp.three;
      this.kag.tmp.three.models[pm.name].stopAnim(pm.finish);
      this.kag.ftag.nextOrder();
    }
  },
};
tyrano.plugin.kag.tag["3d_scene"] = {
  vital: [],
  pm: {
    tonemap: "",
    tonemap_value: "0.8",
    light_amb: "",
    fog: "",
    fog_range: "1,3000",
    fog_color: "0xFFFFFF",
    next: "true",
  },
  start: function (pm) {
    var three = this.kag.tmp.three,
      scene = three.scene,
      renderer = (three.camera, three.renderer);
    if ("" != pm.light_amb) {
      three.stat.scene_pm.light_amb = pm.light_amb;
      three.light_amb.intensity = parseFloat(pm.light_amb);
    }
    if ("" != pm.tonemap) {
      three.stat.scene_pm.tonemap = pm.tonemap;
      renderer.toneMapping = THREE[pm.tonemap + "ToneMapping"];
      renderer.toneMappingExposure = parseFloat(pm.tonemap_value);
      for (let key in three.models) three.models[key].needsUpdate();
    }
    if ("" != pm.fog)
      if ("true" == pm.fog) {
        three.stat.scene_pm.fog = pm.fog;
        three.stat.scene_pm.fog_color = pm.fog_color;
        three.stat.scene_pm.fog_range = pm.fog_range;
        var fog_tmp = pm.fog_range.split(",");
        scene.fog = new THREE.Fog(
          parseInt(pm.fog_color),
          parseFloat(fog_tmp[0]),
          parseFloat(fog_tmp[1]),
        );
      } else {
        three.stat.scene_pm.fog;
        scene.fog.near = 0.1;
        scene.fog.far = 0;
      }
    "true" == pm.next && this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_camera"] = {
  vital: [],
  pm: { pos: "", rot: "", lookat: "", next: "true" },
  start: function (pm) {
    var three = this.kag.tmp.three,
      camera = three.camera;
    three.renderer;
    if ("" != pm.pos) {
      let pos = $.three_pos(pm.pos);
      camera.position.set(pos.x, pos.y, pos.z);
    }
    if ("" != pm.rot) {
      let rot = $.three_pos(pm.rot);
      camera.rotation.set(rot.x, rot.y, rot.z);
    }
    if ("" != pm.lookat) {
      var pos = { x: 0, y: 0, z: 0 };
      if (three.models[pm.lookat]) {
        var model = TYRANO.kag.tmp.three.models[pm.lookat].model;
        pos.x = model.position.x;
        pos.y = model.position.y;
        pos.z = model.position.z;
      } else pos = $.three_pos(pm.lookat);
      camera.lookAt(new THREE.Vector3(pos.x, pos.y, pos.z));
    }
    "true" == pm.next && this.kag.ftag.nextOrder();
  },
};
(tyrano.plugin.kag.tag["3d_gyro"] = {
  vital: [],
  pm: { max_x: "30", max_y: "30", mode: "rotation", next: "true" },
  start: function (pm) {
    var three = this.kag.tmp.three,
      camera = three.camera;
    three.renderer;
    {
      const GyroMonitor = (device_type) => {
        var first_beta = 0,
          first_gamma = 0,
          first_flag = !0,
          max_y = parseFloat(pm.max_y),
          max_x = parseFloat(pm.max_x),
          default_camera_y = camera.rotation.y,
          default_camera_x = camera.rotation.x,
          default_camera_pos_y = camera.position.y,
          default_camera_pos_x = camera.position.x,
          angle = 0;
        parseInt(pm.frame);
        three.stat.gyro.pm = pm;
        const orientEvent = (e) => {
          if (1 == first_flag) {
            first_flag = !1;
            first_beta = e.beta;
            first_gamma = e.gamma;
            angle = this.kag.tmp.angle;
            "rotation" == pm.mode
              ? (three.stat.gyro.mode = 1)
              : (three.stat.gyro.mode = 2);
            if (0 != angle) [max_x, max_y] = [max_y, max_x];
            else {
              max_x = pm.max_x;
              max_y = pm.max_y;
            }
          }
          if (angle == this.kag.tmp.angle) {
            if (0 != angle) {
              var t_gamma = e.gamma;
              if (-90 == angle) {
                if (t_gamma < 0) return;
              } else if (90 == angle && t_gamma > 0) return;
            }
            var hen_y = first_beta - e.beta,
              hen_x = first_gamma - e.gamma;
            Math.abs(hen_y) > max_y && (hen_y = hen_y > 0 ? max_y : -1 * max_y);
            Math.abs(hen_x) > max_x && (hen_x = hen_x > 0 ? max_x : -1 * max_x);
            var gyro_x = 0,
              gyro_y = 0;
            if (1 == three.stat.gyro.mode) {
              if (0 == angle) {
                gyro_y = default_camera_x - hen_x * (Math.PI / 180);
                gyro_x = default_camera_y - hen_y * (Math.PI / 180);
              } else if (-90 == angle) {
                gyro_y = default_camera_y + hen_y * (Math.PI / 180);
                gyro_x = default_camera_x - hen_x * (Math.PI / 180);
              } else if (90 == angle) {
                gyro_y = default_camera_y + -1 * hen_y * (Math.PI / 180);
                gyro_x = default_camera_x - -1 * hen_x * (Math.PI / 180);
              }
            } else if (2 == three.stat.gyro.mode)
              if (0 == angle) {
                gyro_x = default_camera_pos_y + 10 * hen_x;
                gyro_y = default_camera_pos_x + 10 * hen_y;
              } else if (-90 == angle) {
                gyro_y = default_camera_pos_y + 10 * hen_x;
                gyro_x = default_camera_pos_x + 10 * hen_y;
              } else if (90 == angle) {
                gyro_y = default_camera_pos_y + 10 * hen_x;
                gyro_x = default_camera_pos_x + 10 * hen_y;
              }
            three.stat.gyro.x = gyro_x;
            three.stat.gyro.y = gyro_y;
          } else first_flag = !0;
        };
        var sc_width = parseInt(this.kag.config.scWidth),
          sc_height = parseInt(this.kag.config.scHeight),
          sc_x = sc_width / 2,
          sc_y = sc_height / 2;
        const mouseMoveEvent = (e) => {
          var x = e.clientX,
            y = e.clientY,
            p_x = (x -= sc_x) / sc_x,
            p_y = (y = -1 * (y - sc_y)) / sc_y,
            max_x = parseFloat(pm.max_x),
            max_y = parseFloat(pm.max_y),
            gyro_x = 0,
            gyro_y = 0;
          if (1 == first_flag) {
            first_flag = !1;
            "rotation" == pm.mode
              ? (three.stat.gyro.mode = 1)
              : (three.stat.gyro.mode = 2);
          }
          if (1 == three.stat.gyro.mode) {
            gyro_x = default_camera_x + max_x * p_x * (Math.PI / 180);
            gyro_y = default_camera_y - max_y * p_y * (Math.PI / 180);
          } else if (2 == three.stat.gyro.mode) {
            gyro_y = default_camera_pos_x + max_x * p_x;
            gyro_x = default_camera_pos_y + max_y * p_y;
          }
          three.stat.gyro.x = gyro_y;
          three.stat.gyro.y = gyro_x;
        };
        if ("pc" == device_type) {
          $(".tyrano_base")
            .get(0)
            .removeEventListener("mousemove", mouseMoveEvent);
          $(".tyrano_base")
            .get(0)
            .addEventListener("mousemove", mouseMoveEvent, !0);
        } else {
          window.removeEventListener("deviceorientation", orientEvent);
          window.addEventListener("deviceorientation", orientEvent, !0);
        }
      };
      (() => {
        "pc" != $.userenv()
          ? DeviceMotionEvent &&
            ("function" == typeof DeviceMotionEvent.requestPermission
              ? DeviceMotionEvent.requestPermission()
                  .then((permissionState) => {
                    "granted" === permissionState && GyroMonitor("sp");
                  })
                  .catch(console.error)
              : GyroMonitor("sp"))
          : GyroMonitor("pc");
      })();
    }
    "true" == pm.next && this.kag.ftag.nextOrder();
  },
}),
  (tyrano.plugin.kag.tag["3d_gyro_stop"] = {
    vital: [],
    pm: { max_x: "30", max_y: "30", frame: "1", next: "true" },
    start: function (pm) {
      var three = this.kag.tmp.three;
      three.camera, three.renderer;
      three.stat.gyro.mode = 0;
      this.kag.ftag.nextOrder();
    },
  }),
  (tyrano.plugin.kag.tag["3d_debug_camera"] = {
    vital: [],
    pm: {
      name: "camera",
      button_text: "カメラインスペクタを閉じる",
      menu: "true",
    },
    start: function (pm) {
      var three = this.kag.tmp.three,
        j_canvas = three.j_canvas,
        target_layer = three.target_layer,
        old_target_layer_zindex = target_layer.css("z-index"),
        old_canvas_zindex = j_canvas.css("z-index");
      j_canvas.css("z-index", 9999999);
      target_layer.css("z-index", 9999999);
      var model = this.kag.tmp.three.models[pm.name].model,
        renderer = three.renderer,
        mousedown =
          (three.camera,
          parseInt(this.kag.config.scWidth),
          parseInt(this.kag.config.scHeight),
          !1),
        button = 0,
        original_v =
          (new THREE.Vector3(),
          new THREE.Vector3(),
          new THREE.Vector3(),
          $.setVector(model)),
        first_client_x = 0,
        first_client_y = 0,
        first_model_x = 0,
        first_model_y = 0,
        first_model_z = 0;
      function evt_mousewheel(e) {
        e.wheelDelta < 0 ? (model.position.z += 5) : (model.position.z -= 5);
        evt_mouseup();
        e.preventDefault();
      }
      function evt_mousedown(e) {
        if (0 == e.button) {
          button = 0;
          first_client_x = e.clientX;
          first_client_y = e.clientY;
          first_model_x = model.rotation.x;
          first_model_y = model.rotation.y;
        } else if (1 == e.button) {
          button = 1;
          first_client_y = e.clientY;
          first_model_z = model.position.z;
        } else if (2 == e.button) {
          button = 2;
          first_client_x = e.clientX;
          first_client_y = e.clientY;
          first_model_x = model.position.x;
          first_model_y = model.position.y;
        }
        mousedown = !0;
      }
      function evt_mousemove(e) {
        if (mousedown)
          if (0 == button) {
            var hen_x = first_client_x - e.clientX;
            model.rotation.y = first_model_y + 0.005 * hen_x;
            var hen_y = first_client_y - e.clientY;
            model.rotation.x = first_model_x + 0.005 * hen_y;
          } else if (1 == button) {
            hen_y = first_client_y - e.clientY;
            model.position.z = first_model_z + hen_y;
          } else if (2 == button) {
            hen_x = first_client_x - e.clientX;
            model.position.x = first_model_x + 1 * hen_x;
            hen_y = first_client_y - e.clientY;
            model.position.y = first_model_y + -1 * hen_y;
            model.position.x = $.orgFloor(model.position.x, 1);
            model.position.y = $.orgFloor(model.position.y, 1);
          }
      }
      function evt_mouseup(e) {
        first_client_x = 0;
        first_client_y = 0;
        if (0 == button)
          $.orgFloor(model.rotation.x, 100),
            $.orgFloor(model.rotation.y, 100),
            model.rotation.z;
        var msg =
          'pos="' +
          (model.position.x + "," + model.position.y + "," + model.position.z) +
          '" rot="' +
          ($.orgFloor(model.rotation.x, 100) +
            "," +
            $.orgFloor(model.rotation.y, 100) +
            "," +
            $.orgFloor(model.rotation.z, 100)) +
          '" scale="' +
          ($.orgFloor(model.scale.x, 100) +
            "," +
            $.orgFloor(model.scale.y, 100) +
            "," +
            $.orgFloor(model.scale.z, 100)) +
          '" ';
        j_debug_msg.find("input").val(msg);
        mousedown = !1;
      }
      renderer.domElement.addEventListener("mousewheel", evt_mousewheel, !1);
      renderer.domElement.addEventListener("mousedown", evt_mousedown, !1);
      renderer.domElement.addEventListener("mouseup", evt_mouseup, !1);
      renderer.domElement.addEventListener("mousemove", evt_mousemove, !1);
      var j_close_button = $(
        "<div class='area_three_debug' style='position:absolute;z-index:9999999999;padding:10px;opacity:0.8;background-color:white;left:0px;top:0px'><button style='cursor:pointer'><span style=''>" +
          pm.button_text +
          "</span></button></div>",
      );
      j_close_button.draggable({ scroll: !1, stop: (e, ui) => {} });
      var j_debug_msg = $(
          "<div style='padding:5px'><input type='text' style='width:320px' /></div>",
        ),
        j_copy_button = $("<input type='button' value='コピー' />");
      j_copy_button.on("click", (e) => {
        evt_mouseup();
        j_debug_msg.find("input").select();
        document.execCommand("copy");
      });
      var j_reset_button = $("<input type='button' value='リセット' />");
      j_reset_button.on("click", (e) => {
        model.position.set(
          original_v.pos.x,
          original_v.pos.y,
          original_v.pos.z,
        );
        model.rotation.set(
          original_v.rot.x,
          original_v.rot.y,
          original_v.rot.z,
        );
        model.scale.set(
          original_v.scale.x,
          original_v.scale.y,
          original_v.scale.z,
        );
      });
      j_close_button.find("button").on("click", (e) => {
        j_close_button.remove();
        j_canvas.css("z-index", old_canvas_zindex);
        target_layer.css("z-index", old_target_layer_zindex);
        renderer.domElement.removeEventListener("mousedown", evt_mousedown);
        renderer.domElement.removeEventListener("mouseup", evt_mouseup);
        renderer.domElement.removeEventListener("mousemove", evt_mousemove);
        renderer.domElement.removeEventListener("mousewheel", evt_mousewheel);
        this.kag.ftag.nextOrder();
      });
      if ("true" == pm.menu) {
        j_close_button.append("<span style='font-size:10px'>｜</span>");
        j_close_button.append(j_copy_button);
        j_close_button.append(j_reset_button);
        j_close_button.append(j_debug_msg);
      }
      $("body").append(j_close_button);
    },
  });
tyrano.plugin.kag.tag["3d_motion"] = {
  vital: ["name", "motion"],
  pm: { name: "", motion: "" },
  start: function (pm) {
    if (0 != $.checkThreeModel(pm.name)) {
      this.kag.tmp.three;
      this.kag.tmp.three.models[pm.name].setMotion(pm.motion);
      this.kag.ftag.nextOrder();
    }
  },
};
tyrano.plugin.kag.tag["3d_debug"] = {
  vital: ["name"],
  pm: {
    name: "",
    button_text: "3Dインスペクタを閉じる",
    menu: "true",
    overlap: "false",
    reset: "false",
  },
  start: function (pm) {
    var three = this.kag.tmp.three,
      j_canvas = three.j_canvas,
      target_layer = three.target_layer,
      old_target_layer_zindex = target_layer.css("z-index"),
      old_canvas_zindex = j_canvas.css("z-index"),
      model_obj = this.kag.tmp.three.models[pm.name],
      model = model_obj.model,
      camera = (three.renderer, three.camera),
      prevPosition =
        (parseInt(this.kag.config.scWidth),
        parseInt(this.kag.config.scHeight),
        {}),
      mousedown = !1,
      button = 0,
      vec = new THREE.Vector3(),
      pos = new THREE.Vector3(),
      original_pos = new THREE.Vector3(),
      hen_pos = { x: 0, y: 0, z: 0 },
      original_v = $.setVector(model),
      first_client_y = 0,
      first_model_z = 0;
    function evt_mousewheel(e) {
      if (e.wheelDelta < 0) {
        model.scale.x -= 0.01 * model.scale.x;
        model.scale.y -= 0.01 * model.scale.y;
        model.scale.z -= 0.01 * model.scale.z;
      } else {
        model.scale.x += 0.01 * model.scale.x;
        model.scale.y += 0.01 * model.scale.y;
        model.scale.z += 0.01 * model.scale.z;
      }
      evt_mouseup();
      e.preventDefault();
    }
    function evt_mousedown(e) {
      if (0 == e.button) button = 0;
      else if (1 == e.button) {
        button = 1;
        first_client_y = e.clientY;
        first_model_z = model.position.z;
      } else if (2 == e.button) {
        button = 2;
        vec.set(
          (e.clientX / window.innerWidth) * 2 - 1,
          (-e.clientY / window.innerHeight) * 2 + 1,
          0.5,
        );
        vec.unproject(camera);
        vec.sub(camera.position).normalize();
        var distance = 0;
        distance =
          camera.position.z > 0
            ? -camera.position.z / vec.z
            : camera.position.z / vec.z;
        original_pos.copy(camera.position).add(vec.multiplyScalar(distance));
        hen_pos.x = model.position.x - original_pos.x;
        hen_pos.y = model.position.y - original_pos.y;
      }
      mousedown = !0;
      prevPosition = { x: e.clientX, y: e.clientY };
    }
    function evt_mousemove(e) {
      if (mousedown) {
        j_close_button.hide();
        if (0 == button) {
          moveDistance = {
            x: prevPosition.x - e.clientX,
            y: prevPosition.y - e.clientY,
          };
          model.rotation.x += 0.01 * moveDistance.y;
          model.rotation.y -= 0.01 * moveDistance.x;
          prevPosition = { x: e.clientX, y: e.clientY };
        } else if (1 == button) {
          var hen_y = first_client_y - e.clientY;
          model.position.z = first_model_z + hen_y;
        } else if (2 == button) {
          vec.set(
            (e.clientX / window.innerWidth) * 2 - 1,
            (-e.clientY / window.innerHeight) * 2 + 1,
            0.5,
          );
          vec.unproject(camera);
          vec.sub(camera.position).normalize();
          var distance = 0;
          distance =
            camera.position.z > 0
              ? -camera.position.z / vec.z
              : camera.position.z / vec.z;
          pos.copy(camera.position).add(vec.multiplyScalar(distance));
          model.position.x = $.orgFloor(hen_pos.x + pos.x, 1);
          model.position.y = $.orgFloor(hen_pos.y + pos.y, 1);
        }
      }
    }
    function evt_mouseup(e) {
      j_close_button.show();
      if (0 == button)
        $.orgFloor(model.rotation.x, 100),
          $.orgFloor(model.rotation.y, 100),
          model.rotation.z;
      var msg_pos =
          model.position.x + "," + model.position.y + "," + model.position.z,
        msg_rot =
          $.orgFloor(model.rotation.x, 100) +
          "," +
          $.orgFloor(model.rotation.y, 100) +
          "," +
          $.orgFloor(model.rotation.z, 100),
        msg_scale =
          $.orgFloor(model.scale.x, 100) +
          "," +
          $.orgFloor(model.scale.y, 100) +
          "," +
          $.orgFloor(model.scale.z, 100),
        _pm = model_obj.pm;
      _pm.pos = msg_pos;
      _pm.rot = msg_rot;
      _pm.scale = msg_scale;
      model_obj.pm = _pm;
      var msg =
        'pos="' +
        msg_pos +
        '" rot="' +
        msg_rot +
        '" scale="' +
        msg_scale +
        '" ';
      j_debug_msg.find("input").val(msg);
      mousedown = !1;
    }
    if ("true" == pm.overlap) {
      j_canvas.css("z-index", 9999999);
      target_layer.css("z-index", 9999999);
    }
    var j_three_debug_layer = $(
      "<div style='width:100%;height:100%;position:absolute;z-index:9999999;'></div>",
    );
    $(".tyrano_base").append(j_three_debug_layer);
    var three_debug_layer = j_three_debug_layer.get(0);
    three_debug_layer.addEventListener("mousewheel", evt_mousewheel, !1);
    three_debug_layer.addEventListener("mousedown", evt_mousedown, !1);
    three_debug_layer.addEventListener("mouseup", evt_mouseup, !1);
    three_debug_layer.addEventListener("mousemove", evt_mousemove, !1);
    var j_close_button = $(
      "<div class='area_three_debug' style='position:absolute;z-index:9999999999;padding:10px;opacity:0.8;background-color:white;left:0px;top:0px'><button style='cursor:pointer'><span style=''>" +
        pm.button_text +
        "</span></button></div>",
    );
    j_close_button.draggable({ scroll: !1, stop: (e, ui) => {} });
    var j_debug_msg = $(
        "<div style='padding:5px'><input type='text' style='width:320px' /></div>",
      ),
      j_copy_button = $("<input type='button' value='コピー' />");
    j_copy_button.on("click", (e) => {
      evt_mouseup();
      j_debug_msg.find("input").select();
      document.execCommand("copy");
    });
    var j_reset_button = $("<input type='button' value='リセット' />");
    j_reset_button.on("click", (e) => {
      model.position.set(original_v.pos.x, original_v.pos.y, original_v.pos.z);
      model.rotation.set(original_v.rot.x, original_v.rot.y, original_v.rot.z);
      model.scale.set(
        original_v.scale.x,
        original_v.scale.y,
        original_v.scale.z,
      );
    });
    j_close_button.find("button").on("click", (e) => {
      j_three_debug_layer.remove();
      "true" == pm.reset && j_reset_button.trigger("click");
      j_close_button.remove();
      j_canvas.css("z-index", old_canvas_zindex);
      target_layer.css("z-index", old_target_layer_zindex);
      three_debug_layer.removeEventListener("mousedown", evt_mousedown);
      three_debug_layer.removeEventListener("mouseup", evt_mouseup);
      three_debug_layer.removeEventListener("mousemove", evt_mousemove);
      three_debug_layer.removeEventListener("mousewheel", evt_mousewheel);
      this.kag.ftag.nextOrder();
    });
    if ("true" == pm.menu) {
      j_close_button.append("<span>｜</span>");
      j_close_button.append(j_copy_button);
      j_close_button.append(j_reset_button);
      j_close_button.append(j_debug_msg);
    }
    $("body").append(j_close_button);
    evt_mouseup();
  },
};
