import path from 'path';
import { spawn } from 'child_process';

// extending default timeout
// as we creating an external process
jest.setTimeout(20 * 1000);

test('should transform data correctly', (done) => {
  const loggerFile = path.join(__dirname, 'logger.js');
  const loggerApp = spawn('node', [loggerFile]);

  loggerApp.stdout.on('data', (line) => {
    const data = JSON.parse(line.toString());

    expect(data.level).toEqual(40);
    expect(data.isError).toEqual(true);

    done();
  });
});
