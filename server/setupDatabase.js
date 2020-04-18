module.exports = () => {
  const databaseUrl = process.env['DATABASE_URL'];
  if (!databaseUrl) {
    console.error('環境変数DATABASE_URLが設定されていません');
    process.exit(1);
  }

  const {execSync} = require('child_process');
  const {Sequelize} = require('sequelize');
  const sequelize = new Sequelize(process.env['DATABASE_URL'], {
    logging: false,
  });

  console.log('データベースとの接続チェック...');
  return sequelize.authenticate().then(() => {
    console.log('接続成功');
  }).catch(() => {
    console.log('接続失敗');
    console.log('データベースを作成します...');
    try {
      execSync('npx sequelize-cli db:create');
      console.log('作成できました。');
    } catch (error) {
      console.error('作成に失敗しました', error.message);
      process.exit(1);
    }
  }).then(() => {
    console.log('データベースのマイグレーションを実行しています...');
    try {
      execSync('npx sequelize-cli db:migrate');
      console.log('マイグレーション成功');
    } catch (error) {
      console.error('データベースのマイグレーションに失敗しました', error.message);
      process.exit(1);
    }
  });
};

