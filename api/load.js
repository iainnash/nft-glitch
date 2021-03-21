module.exports = async (req, res) => {
      res.setHeader('content-type', 'text/javascript');
      res.send(
          `
          (() => {
            const pageParts = window.location.pathname.split('/');
            if (pageParts) {
                const div = document.createElement('div');
                div.style.padding = 10;
                div.style.right = 0;
                div.style.color = '#eee';
                div.innerHTML = "<a style='color:#555;font-size:11px' target='_blank' href='https://nftglitch.vercel.app/editor/"+pageParts[pageParts.length-1]+"'>remix with nftglitch</a>"
                document.body.appendChild(div)
            }
          })();
          `
      );
    };
  
  