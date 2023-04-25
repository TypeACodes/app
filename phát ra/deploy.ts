import ProgressBar from 'progress';

type ServerConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
};

function deploy(server: ServerConfig, files: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    // Connect to server using SSH or FTP client
    const client = new FTPClient(server.host, server.port, server.user, server.password);

    // Initialize progress bar
    const bar = new ProgressBar('Deploying [:bar] :percent :etas', {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: files.length
    });

    // Upload files to server
    let uploadedCount = 0;
    client.upload(files, {
      onFileUpload: () => {
        uploadedCount++;
        bar.tick();
      }
    })
      .then(() => {
        console.log(`Successfully deployed ${files.length} files to ${server.host}:${server.port}`);
        client.disconnect();
        resolve();
      })
      .catch((err) => {
        console.error(`Failed to deploy files to ${server.host}:${server.port}: ${err.message}`);
        client.disconnect();
        reject(err);
      });
  });
}
