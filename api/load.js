module.exports = async (req, res) => {
      res.setHeader('content-type', 'text/javascript');
      res.send(
          `
          (() => {
            const pageParts = window.location.pathname.split('/');
            if (pageParts) {
                const cloneStamp = document.createElement('div');
                div.style.position = 'absolute';
                div.style.top = 0;
                div.style.right = 0;
                div.style.color = '#eee';
                div.innerHTML = "<a target='_blank' href='https://nftglitch.vercel.app/editor/"+pageParts[pageParts.length-1]+"'>remix with nftglitch</a>"
                document.body.appendChild(div)
            }
          });
          `
      );
    };
  
  