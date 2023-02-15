class SocketSubApi1Job < ApplicationJob
  queue_as :default

  def perform(kifu)
      # sub_api1にソケット接続する
      sock = TCPSocket.open("sub_api1", 20000)
      # sock.set_encoding 'utf-8'

      # ソケットに入力文字列を渡す
      sock.sendmsg  kifu.content
      
      # sub_api1から返却された文字列
      msg = sock.recvmsg[0]
      # ソケット CLOSE
      sock.close

      # Kifuモデルのkentoカラムを更新
      kifu.kento = msg
      kifu.save
  end
end
