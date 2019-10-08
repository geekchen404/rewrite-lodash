
// 输入：a([4, 8], "function  square(n)  {  \n        return  n  *  n;\n      }")
// 输出 / 期望：[16, 64]
// =================
// 输入：a({"a":4,"b":8},"function  square(n)  {  \n        return  n  *  n;\n      }")
// 输出/期望：[16,64]
// =================
// 输入：a([{"user":"barney"},{"user":"fred"}],"user")
// 输出/期望：["barney","fred"]
// =================
// 输入：a(["6","8","10"],"function parseInt() {\n/* [wrapped with _.ary] */\n[native code] }")
// 输出 / 期望：[6, 8, 10]
// =================
// 输入：a(["6","8","10"],"function parseInt() {\n/* [wrapped with _.ary] */\n [native code] }")
// 输出/期望：[6,8,10]
// =================
// 输入：a(["6","08","10"],"function(n,t,r){return r||null==t?t=0:t&&(t=+t),$i(zu(n).replace(an,\"\"),t||0)}")
// 输出/期望：[6,8,10]
// =================
// 输入：a(["  foo  ","  bar  "],"function(n,t,r){return(n=zu(n))&&(r||t===F)?n.replace(cn,\"\"):n&&(t=wr(t))?(n=$(n),r=$(t),t=z(n,r),r=W(n,r)+1,Wr(n,t,r).join(\"\")):n}")
// 输出/期望：["foo","bar"]
// =================
// 输入：a([{"user":"barney","age":36,"active":true},{"user":"fred","age":40,"active":false}],"function(t){return null==t?F:t[n]}")
// 输出/期望：["barney","fred"]
// =================
// 输入：a([{"a":{"b":"function(){return n}"}},{"a":{"b":"function(){return n}"}}],"function(r){return Mt(r,n,t)}")
// 输出/期望：[2,1]
// =================
// 输入：a([{"a":{"b":"function(){return n}"}},{"a":{"b":"function(){return n}"}}],"function(r){return Mt(r,n,t)}")
// 输出/期望：[2,1]
// =================
// 输入：a(["a[2]","c[0]"],"function(r){return Mt(n,r,t)}")
// 输出/期望：[2,0]
// =================
// 输入：a([["a","2"],["c","0"]],"function(r){return Mt(n,r,t)}")
// 输出/期望：[2,0]
// =================
// 输入：a([{"a":{"b":2}},{"a":{"b":1}}],"function(t){return Rt(t,n)}")
// 输出/期望：[2,1]
// =================
// 输入：a([{"a":{"b":1}},{"a":{"b":2}}],"a.b")
// 输出/期望：[1,2]
// =================
// 输入：a(["a[2]","c[0]"],"function(t){return null==n?F:Rt(n,t)}")
// 输出/期望：[2,0]
// =================
// 输入：a([["a","2"],["c","0"]],"function(t){return null==n?F:Rt(n,t)}")
// 输出/期望：[2,0]
// =================
// 输入：a([1,2,3],"function(v,i,o) {return v+i+o.length*2}")
// 输出/期望：[7,9,11]
// =================
// 输入：a([1,2,3,4,5],"function(v,i,o) {return (v+i)%2==0}")
// 输出/期望：[false,false,false,false,false]

