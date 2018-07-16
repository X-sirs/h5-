(function(w){
	 const SqlTool = function(initOptions) {
         return new SqlTool.fn.init(initOptions);
     }
     SqlTool.prototype = SqlTool.fn = {
         constructor: SqlTool,
         init: function (initOptions){
			this.dataBase = window.openDatabase(initOptions.dbname, initOptions.version, initOptions.dbdesc, initOptions.dbsize,function() {
				console.log("正在连接数据库")
			});
			if (this.dataBase) {
				console.log("数据库创建/打开成功!");
			} else{
				console.log("数据库创建/打开失败！");
			}
			return this;
		},
		creatTable:function(tableName){
			this.tableName = tableName;
			let creatTableSQL = "CREATE TABLE IF  NOT EXISTS "+ tableName + " (ID INTEGER PRIMARY KEY AUTOINCREMENT,TIME datetime DEFAULT (datetime('now','localtime')) , LNG double,LAT double)";
			this.dataBase.transaction(function (ctx,result) {
				ctx.executeSql(creatTableSQL,[],function(ctx,result){
					console.log("表创建成功 " + tableName);
				},function(tx, error){ 
					console.log('表创建失败-' + tableName + error.message);
				});
			});
			return this;
		},
		addData:function(LNG,LAT){
			let insterTableSQL = 'INSERT INTO ' + this.tableName + ' (LNG,LAT) VALUES (?,?)';
			this.dataBase.transaction(function (ctx) {
				ctx.executeSql(insterTableSQL,[LNG,LAT],function (ctx,result){
					console.log("插入数据成功");
				},
				function (tx, error) {
					console.log('插入失败-' + error.message);
				});
			});
			return this;
		},
		getAllData:function(){   
			let selectALLSQL = 'SELECT * FROM ' + this.tableName;
			this.dataBase.transaction(function (ctx) {
				ctx.executeSql(selectALLSQL,[],function (ctx,result){
					console.log('查询成功到'+result.rows.length+'条数据');
				},
				function (tx, error) {
					console.log('查询失败-' + error.message);
				});
			});
			return this;
		},
		getData:function(pageIndex,pageSize){    
			let selectSQL = 'SELECT * FROM ' + this.tableName + ' LIMIT '+ (pageIndex-1)*pageSize+','+pageSize;
			console.log(selectSQL);
			this.dataBase.transaction(function (ctx) {
				ctx.executeSql(selectSQL,[],function (ctx,result){
					console.log(result)
					console.log('查询成功 ' + result.rows.length);
				},
				function (tx, error) {
					console.log('查询失败-' + error.message);
				});
			});
			return this;
		},
		dropTable:function(){
			let deleteTableSQL = 'DROP TABLE ' + this.tableName;
			this.dataBase.transaction(function (ctx,result) {
				ctx.executeSql(deleteTableSQL,[],function(ctx,result){
					console.log("删除表成功");
				},function(tx, error){ 
					console.log('删除表失败-' + this.tableName + error.message);
				});
			});
			return this;
		},
     }
	 
     SqlTool.fn.init.prototype = SqlTool.fn;
     window.SqlTool  = SqlTool;
})(window||{})


