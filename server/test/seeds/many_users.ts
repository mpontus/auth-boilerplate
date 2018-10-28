import { getConnection } from 'typeorm';
import { User } from '../../src/user/data/entity/user.entity';

export const users = [
  ['1020792911429632', 'Derek Blake', 'big@hodef.va', 'cfqNXCK#wPGMQg6uPdKK'],
  ['4433688441913344', 'Phoebe Sandoval', 'cahlusu@hutarofo.us', 'FZUw1]xBp'],
  ['7591496318451712', 'Della Hale', 'edi@nizoseap.gu', '(HIozRfXw'],
  ['6661526800826368', 'Jeffery Munoz', 'tuzdira@evsin.je', '!tPP9KxYD7ISnp)'],
  ['5296032296468480', 'Norman Lane', 'tafonwor@kosi.gh', 'KNHaRyCb71PSD#'],
  ['2475574186475520', 'Louis Moran', 'rusrag@la.pg', 'VTIP[Y!'],
  ['810085049696256', 'Bobby Stevens', 'rosiwad@silgihun.tk', 'Fc*3I^Qg'],
  ['2406117441273856', 'Mina Wallace', 'zipco@nursa.uk', 'K)P#MVxHSTmP'],
  ['654970728742912', 'Edna Davis', 'wezsom@zijagko.ki', 'dCUYvyjPFmc'],
  ['4309729140539392', 'Frank Watson', 'biubdah@ma.et', 'Q%w5YR&2%ZP[Dln'],
  ['5548803264348160', 'Dorothy Burgess', 'tub@ra.dm', '5!WA0Ni5cP@^^cSUu'],
  ['2348784637968384', 'Olivia Delgado', 'tomzid@pufkejwem.sd', '2!zpe5!aL'],
  ['2158331166720000', 'Essie Rhodes', 'iko@izoka.ge', '^J*c%Ip$rENky'],
  ['8478522270023680', 'Mabelle Doyle', 'ag@empid.cc', 'D!hdjk0psa0#a@^9cVI6'],
  ['6389055570837504', 'Susan Newman', 'nabal@jetempu.ug', 'hnJVQDduWTnAAINL'],
  ['8852579823910912', 'Edna Bates', 'bu@panugez.us', 'M2&TboxnUpYso'],
  ['1350331130707968', 'Georgia Morton', 'fu@bajar.tn', '#wtUuUk#RpZlbrJqpJ0'],
  ['7847027679428608', 'Antonio Parsons', 'nihanu@ma.bw', '&QyHn$q@*2I&pt2b64'],
  ['859393386086400', 'Andrew Barnes', 'dagi@hujpazkej.bw', 'b)XssbLFB&Qy'],
  ['2229458104745984', 'Janie Norris', 'om@simdesucu.et', 'Br[JbQs0oM4h'],
  ['5573184038371328', 'Lucille Chambers', 'vitev@nu.jp', '!ddBn3RnOVD@Co[]W'],
  ['2164160114720768', 'Dominic Pratt', 'jube@selhiv.io', 'o$0H%k'],
  ['5480526123106304', 'Carolyn Morgan', 'gu@ujo.as', 'sY@xKa6yKdTQ]hK)'],
  ['6094319444295680', 'Don Elliott', 'wemo@bevfog.py', 'G)vAhm(TQYqDF@i#bswF'],
  ['8446400702447616', 'Allie Sanchez', 'gozipe@umioke.cy', 'Y3yk*&'],
  ['4276111636692992', 'Louis Mack', 'owmotahu@liragso.ms', 'jq(%oY)K@%o'],
  ['4506239159500800', 'Leona Jensen', 'ub@du.uk', 'kbJ8cVjp0X18WacgX0Ft'],
  ['3848292916002816', 'Ricky Rhodes', 'epe@rin.ph', 'DW(oXnF6#ArX'],
  ['462172436037632', 'Emily Morales', 'oseha@etige.dz', 'Yo9mS'],
  ['691791003123712', 'Lewis Lopez', 'ig@ugni.ru', 'zC[10ZWo!qPtRKACfi'],
  ['7947380341080064', 'Caleb Smith', 'eb@va.bb', 'y3bRPmwoqEH^KG)'],
].map(([id, name, email]) => ({
  id,
  name,
  email,
  passwordHash: '',
}));

export const run = () => {
  const { manager } = getConnection();

  manager.save(User, users.map(user => manager.create(User, user)));
};
