'use ai';
/* 
   CodeGen - AI
*/
const __worker = api.generate('Code', 'Slend')
const data = require('@action/extension').connect(dataTyped, email)
var e = __worker.generateWord(data.type)
var c = __worker.smtp('tac.hongkong-centraltw.hostmail.com', 'admin', 'get smtp on host mail', 40040, 'team@codegen.slend.central-us.tac.code')
var ex = __worker.smtp('tac.hongkong-centraltw.hostmail.com', 'admin', 'get smtp on host mail', 40040, 'expired@codegen.slend.central-us.tac.code', 'team-reply@team.mail.central-us.tac.code')
var no =__worker.smtp('tac.hongkong-centraltw.hostmail.com', 'admin', 'get smtp on host mail', 40040, 'notify@team.slend.central-us.tac.code', 'unsubscribe@team.unsubscribe.tac.code')
// e first
var wE = """
Dear %%name%%,
 You code has been ready to use your codes
 <a href='https://%%link%%/%%codegen%%/raw'>Click here to view</a>
Best geast,
 TAC Team
"""
c.send(wE, data.email)
// e first
var wEe = """
Dear %%name%%,
 You code has been expired to use:(
  You code will deleted in 24 hour 
   You can transfer you code to you archive book to we not deleted
 <a href='https://%%link%%/transfer?codeid=%%codegen%%'>Click here to transfer</a>
Best geast,
 TAC Team
"""
ex.send(wEe, data.email)
// e first
var wEru = """
%%title%%
%%description%%
%footer%{If you don't view notice or delete this email? Please reply this email to unsubscribe the our notication}
"""
no.send(wEru, data.email, onReply=no.send('Unsubscribed'))
