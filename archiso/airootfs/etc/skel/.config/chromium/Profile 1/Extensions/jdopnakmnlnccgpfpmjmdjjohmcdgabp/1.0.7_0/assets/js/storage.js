class Storage {

  constructor () {
    this.handleChanged = this.handleChanged.bind(this);

    this.store = {}; // FLAT STORE
    /*
    <STORE STRUCTURE>
    TABID_CAPTUREAREA: BOOLEAN,
    // TABID_CAPTURETAB: BOOLEAN,
    // TABID_CAPTUREVOICE: BOOLEAN
    ...
    */
    this.events();
  }

  setDefaults(cb) {
    let set = {};
    set["CAPTURESOUND"] = true;
    set["IS_DAY"] = true;
    set["CODEC_SELECTED"] = "video/webm\;codecs=h264";
    chrome.storage.local.set(set, cb);
  }

  events () {
    this.addStoreChangedListener(this.handleChanged);
  }

  addStoreChangedListener (listener) {
    chrome.storage.onChanged.addListener(listener);
  }

  handleChanged (changes) {
    this.store = {
      ...this.store,
      ...changes
    };
  }

  getCaptureArea (tab, cb) {
    let field = tab +"_CAPTUREAREA";
    chrome.storage.local.get(field, cb);
  }

  async getCaptureSound() {
    let field = "CAPTURESOUND";
    return (await this.readLocalStorage(field));
  }

  async getCaptureVoice() {
    let field = "CAPTUREVOICE";
    return (await this.readLocalStorage(field));
  }

  async getCaptureCamera() {
    let field = "CAPTURECAMERA";
    return (await this.readLocalStorage(field));
  }

  async getAuth() {
    let field = "AUTH";
    return (await this.readLocalStorage(field));
  }

  async getOptionGdrive() {
    let field = "GOOGLEDRIVE";
    return (await this.readLocalStorage(field));
  }

  async getIsDay() {
    let field = "IS_DAY";
    return (await this.readLocalStorage(field));
  }

  async getCodec() {
    let field = "CODEC_SELECTED";
    return (await this.readLocalStorage(field));
  }

  async get (field) {
    // return new Promise((resolve, reject) => chrome.storage.local.get(field, ret => resolve(ret[field])));
    return (await this.readLocalStorage(field));
  }

  readLocalStorage(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([key], function(result) {
            if (Object.values(result)[0] != undefined) {
                resolve(Object.values(result)[0]);
            } else {
                reject();
            }
        });
    });
}  
  setOptionGdrive (value, cb) {
    let set = {};
    set["GOOGLEDRIVE"] = value;
    chrome.storage.local.set(set,cb);
  }

  setAuth (result, cb) {
    let set = {};
    set["AUTH"] = result;
    chrome.storage.local.set(set,cb);
  }

  setCaptureCamera(value, cb) {
    let set = {};
    set["CAPTURECAMERA"] = value;
    chrome.storage.local.set(set,cb);
  }
  setCaptureVoice(value, cb) {
    let set = {};
    set["CAPTUREVOICE"] = value;
    chrome.storage.local.set(set,cb);
  }
  setCaptureSound(value, cb) {
    let set = {};
    set["CAPTURESOUND"] = value;
    chrome.storage.local.set(set,cb);
  }
  setCaptureArea (tab, value, cb) {
    let set = {};
    set[tab+"_CAPTUREAREA"] = value;
    chrome.storage.local.set(set,cb);
  }
  setIsDay(value, cb) {
    let set = {};
    set["IS_DAY"] = value;
    chrome.storage.local.set(set,cb);
  }
  setTab(tabid, tab, cb) {
    let set = {};
    set[tabid + "_CAPTUREAREA"] = tab['capturearea'];
    //cb = cb || ()=>{};
    chrome.storage.local.set(set,cb);
  }
  setCodec(value, cb) {
    let set = {};
    set["CODEC_SELECTED"] = value;
    chrome.storage.local.set(set,cb);
  }


  getTab (tabid) {
    return new Promise(resolve => {
      chrome.storage.local.get([
        tabid + "_CAPTUREAREA",
        'CAPTUREVOICE',
        'CAPTURECAMERA',
        'CAPTURESOUND',
        'AUTH',
        'IS_DAY',
        'CODEC_SELECTED'
      ], data => {
        let ret = {
            capturesound: !!data['CAPTURESOUND'],
            capturevoice: !!data['CAPTUREVOICE'],
           capturecamera: !!data['CAPTURECAMERA'],
             googledrive: !!data['GOOGLEDRIVE'],
             capturearea: !!data[tabid + "_CAPTUREAREA"],
                    auth: !!data['AUTH'],
                   isDay: !!data['IS_DAY'], 
           codecSelected: data['CODEC_SELECTED'] ? data['CODEC_SELECTED'] : "video/webm\;codecs=h264"
        };
        resolve(ret);
      });
    });
  }

  getTabSync (tab) {
    return {
      capturesound: this.store["CAPTURESOUND"],
      capturevoice: this.store["CAPTUREVOICE"],
              auth: this.store["AUTH"],
       googledrive: this.store["GOOGLEDRIVE"],
     capturecamera: this.store["CAPTURECAMERA"],
       capturearea: this.store[tab + "_CAPTUREAREA"],
             isDay: this.store["IS_DAY"],
     codecSelected: this.store["CODEC_SELECTED"],
    };
  }
}

export default Storage;