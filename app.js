class Player {
  //гг-главный герой
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.maxHealth = 100;
    this.weapon = null;
    this.aid = null;
    this.score = 0;
  }

  heal() {
    if (this.aid) {
      this.health = Math.min(this.health + this.aid.healAmount, this.maxHealth);
      console.log(`${this.name} исцелился до ${this.health} здоровья.`);
      this.aid = null; // Использовать аптечку
    } else {
      console.log('У вас нет аптечки!');
    }
  }

  attack(enemy) {
    if (this.weapon) {
      enemy.takeDamage(this.weapon.damage);
      console.log(
        `${this.name} атакует ${enemy.name} с ${this.weapon.name}, нанося ${this.weapon.damage} урона.`,
      );
    } else {
      console.log('У вас нет оружия для атаки!');
    }
  }
}

class Enemy {
  //класс для создания противнмка
  constructor(name, health, weapon) {
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.weapon = weapon;
  }

  takeDamage(damage) {
    this.health -= damage;
    console.log(`${this.name} получает ${damage} урона.`);
  }

  attack(player) {
    player.health -= this.weapon.damage;
    console.log(`${this.name} атакует ${player.name}, нанося ${this.weapon.damage} урона.`);
  }
}

class Aid {
  //тут аптечка
  constructor(name, healAmount) {
    this.name = name;
    this.healAmount = healAmount;
  }
}

class Weapon {
  //класс оружия
  constructor(name, damage, durability) {
    this.name = name;
    this.damage = damage;
    this.durability = durability;
  }
}

function generateRandomEnemy() {
  const enemyNames = [
    'Гоблин',
    'работодатель',
    'Чел с параллельной группы',
    'Ведьма',
    'Маг',
    'Единорог',
  ];
  const name = enemyNames[Math.floor(Math.random() * enemyNames.length)];
  const health = Math.floor(Math.random() * 50) + 50;
  const weapon = generateRandomWeapon();
  return new Enemy(name, health, weapon);
}

function generateRandomWeapon() {
  const weaponNames = ['Меч', 'Дробовик', 'Учебник по базе данных', 'Волшебная палочка'];
  const name = weaponNames[Math.floor(Math.random() * weaponNames.length)];
  const damage = Math.floor(Math.random() * 20) + 5;
  const durability = 100;
  return new Weapon(name, damage, durability);
}

function playerTurn(player, enemy) {
  let choice = prompt(
    'Выберите действие: \n1. Атаковать\n2. Использовать аптечку\n3. Проверить состояние',
  );
  switch (choice) {
    case '1':
      player.attack(enemy);
      break;
    case '2':
      player.heal();
      break;
    case '3':
      console.log(
        `Имя: ${player.name}\nЗдоровье: ${player.health}/${player.maxHealth}\nОружие: ${
          player.weapon ? player.weapon.name : 'нет'
        }\nОчки: ${player.score}`,
      );
      break;
    default:
      console.log('Неверный выбор. Выберите 1, 2 или 3.');
  }
}

let player = new Player('ГГ');
let enemy = generateRandomEnemy();
player.weapon = generateRandomWeapon();
player.aid = new Aid('Мini аптечка', 20);
player.aid = new Aid('midle аптечка', 50);
player.aid = new Aid('senior аптечка', 90);

while (player.health > 0) {
  playerTurn(player, enemy);

  if (enemy.health <= 0) {
    player.score += 100;
    console.log(`${player.name} победил ${enemy.name} и теперь имеет ${player.score} очков.`);
    enemy = generateRandomEnemy();
    player.weapon = generateRandomWeapon();
  }

  if (enemy.health > 0 && player.health > 0) {
    enemy.attack(player);
  }

  if (player.health <= 0) {
    console.log(`${player.name} был побежден. Итоговый счет: ${player.score} очков.`);
    break;
  }
}
