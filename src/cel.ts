/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of the GNU Affero General Public License v3.0.
 * You should have received a copy of the GNU Affero General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

type Run = {
  runName: string;
  state: string;
  completeTime: string;
};

export const cel = (runs: [Run]) => {
  const limit = process.env.CEL_LIMIT || 3;
  const rangeInDays = process.env.CEL_RANGE_DAYS || 2;

  const now = new Date();

  const celRuns = runs.map((run) => {
    const completeTime = new Date(parseInt(run["completeTime"]));
    const delta = now.getTime() - completeTime.getTime();
    const deltaDays = Math.floor(delta / 1000 / 60 / 60 / 24);

    return {
      ...run,
      completeTime: completeTime,
      cel: deltaDays < rangeInDays ? true : false,
    };
  });

  const celCount = celRuns.reduce((acc, curr) => {
    return curr.cel === true ? acc + 1 : acc;
  }, 0);

  return {
    cel: celCount >= limit,
    config: {
      limit,
      rangeInDays
    },
    count: celCount,
    runs: celRuns,
  };
};
