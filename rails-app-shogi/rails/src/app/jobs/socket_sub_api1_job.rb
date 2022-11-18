class SocketSubApi1Job < ApplicationJob
  queue_as :default

  def perform(kifu)
      # サーバ接続 OPEN
      sock = TCPSocket.open("sub_api1", 20000)
      # sock.set_encoding 'utf-8'
      # ソケットに入力文字列を渡す
      p kifu
      sock.sendmsg  kifu[:content]
      # サーバから返却された文字列を出力
      msg = sock.recvmsg[0]
      p msg
      # ソケット CLOSE
      sock.close
  end
end
