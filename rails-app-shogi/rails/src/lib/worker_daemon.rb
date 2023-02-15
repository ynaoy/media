class WorkerDaemon < DaemonSpawn::Base
  def start(args)
    exec("rm -f tmp/pids/worker_daemon.pid && bundle exec rails jobs:work")
  end
end

WorkerDaemon.spawn!(
    working_dir: Rails.root,
    pid_file: "#{Rails.root}/tmp/pids/worker_daemon.pid",
    log_file: "#{Rails.root}/log/worker_daemon.log",
  )